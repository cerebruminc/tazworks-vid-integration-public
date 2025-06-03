import {
  BodyMPrimary,
  colors,
  ConnotationColorEnum,
  DialogHandler,
  Input,
  PrimaryButton,
  SnackTypeEnum,
} from "@cerebruminc/cerebellum";
import Head from "next/head";
import { styled } from "styled-components";
import { useState } from "react";

// --- Layout ---
const WizardWrapper = styled.div`
  max-width: 420px;
  margin: 48px auto;
  padding: 36px 30px 36px 30px;
  background: ${colors.WHITE};
  border-radius: 13px;
  border: 1px solid ${colors.BLUE_75};
  box-shadow: 0 4px 24px 0 rgba(54, 86, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #000;
  margin-bottom: 5px;
`;

const ErrorText = styled.div`
  color: ${colors.RED_100};
  margin: 8px 0;
  font-size: 15px;
`;

// TODO: Trocar por Skeleton/Loading do Cerebellum, se houver
const LoadingText = styled.div`
  color: ${colors.BLUE_100};
  text-align: center;
  font-size: 16px;
`;

export default function WorkerDeployWizard() {
  const [orgName, setOrgName] = useState("");
  const [domain, setDomain] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [loading, setLoading] = useState(false);

  // Para feedback de erros simples antes de API
  const [inputError, setInputError] = useState("");

  // Helper para buscar código de um arquivo no GitHub
  async function fetchWorkerFile(filename: "worker.js" | "forwarder.js") {
    const url = `https://raw.githubusercontent.com/cerebruminc/tazworks-vid-integration-public/main/worker/${filename}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Erro ao baixar ${filename} do GitHub`);
    return resp.text();
  }

  // Busca o accountId do usuário pela API do Cloudflare
  async function fetchCloudflareAccountId(token: string): Promise<string> {
    const resp = await fetch("https://api.cloudflare.com/client/v4/accounts", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await resp.json();
    if (!data.success || !data.result?.[0]?.id) throw new Error("Não foi possível identificar sua conta Cloudflare. Confira o token.");
    return data.result[0].id;
  }

  // Faz deploy de um worker na conta do cliente
  async function deployWorker({ name, code, accountId, token }: {
    name: string;
    code: string;
    accountId: string;
    token: string;
  }) {
    // Cloudflare Workers API - PUT script
    const resp = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${name}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/javascript",
        },
        body: code,
      }
    );
    const data = await resp.json();
    if (!data.success) {
      throw new Error(data.errors?.[0]?.message || "Erro ao deployar worker " + name);
    }
    return data;
  }

  // Clique do botão Deploy
  async function handleDeploy() {
    setInputError("");
    if (!orgName.trim() || !domain.trim() || !apiToken.trim()) {
      setInputError("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      // 1. Busca o accountId do usuário
      const accountId = await fetchCloudflareAccountId(apiToken);

      // 2. Busca os dois códigos (worker.js e forwarder.js) do seu GitHub
      const [workerJs, forwarderJs] = await Promise.all([
        fetchWorkerFile("worker.js"),
        fetchWorkerFile("forwarder.js"),
      ]);

      // 3. Faz deploy dos dois workers
      await deployWorker({
        name: "tazworks-main", // você pode customizar esse nome
        code: workerJs,
        accountId,
        token: apiToken,
      });
      await deployWorker({
        name: "tazworks-forwarder", // idem
        code: forwarderJs,
        accountId,
        token: apiToken,
      });

      DialogHandler.show({
        id: "deploy-success",
        title: "Sucesso!",
        text: "Os dois Workers foram implantados na sua conta Cloudflare. Agora só falta ajustar as rotas no painel.",
        snackType: SnackTypeEnum.Dialog,
        colorFamily: ConnotationColorEnum.Positive,
      });
    } catch (err: any) {
      DialogHandler.show({
        id: "deploy-erro",
        title: "Erro!",
        text: err?.message || "Houve um erro desconhecido. Verifique seu token e tente novamente.",
        snackType: SnackTypeEnum.Dialog,
        colorFamily: ConnotationColorEnum.Negative,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <WizardWrapper>
      <Head>
        <title>Deploy de Cloudflare Worker</title>
        <meta name="description" content="Wizard para implantar Workers Cloudflare" />
      </Head>
      <SectionTitle>Deploy automático do Worker</SectionTitle>
      <BodyMPrimary>
        Preencha os dados abaixo para implantar a integração na sua conta Cloudflare. Você precisará de um token da API do Cloudflare com permissão de <b>Workers Write</b> e <b>Account Read</b>.
      </BodyMPrimary>
      <Inputs>
        <Input
          inputLabel="Nome da sua organização"
          value={orgName}
          onValueChange={(value) => setOrgName(String(value))}
          required
          placeholder="Ex: ACME Corp"
        />
        <Input
          inputLabel="Domínio"
          value={domain}
          onValueChange={(value) => setDomain(String(value))}
          required
          placeholder="Ex: exemplo.com"
        />
        <Input
          inputLabel="Cloudflare API Token"
          value={apiToken}
          onValueChange={(value) => setApiToken(String(value))}
          required
          type="password"
          placeholder="Token da API"
        />
      </Inputs>
      {inputError && <ErrorText>{inputError}</ErrorText>}
      <PrimaryButton
        buttonHeight={46}
        buttonWidth={148}
        text={loading ? "Implantando..." : "Deploy"}
        disabled={loading}
        loading={loading}
        onClick={handleDeploy}
        shadow
      />
      {loading && <LoadingText>Implantando os Workers, aguarde…</LoadingText>}
    </WizardWrapper>
  );
}
