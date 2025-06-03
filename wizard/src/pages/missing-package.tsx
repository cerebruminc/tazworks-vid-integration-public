import { BodyMPrimary, colors, PrimaryButton } from "@cerebruminc/cerebellum";
import { styled } from "styled-components";

const SizeWrapper = styled.div`
  height: 600px;
  width: 400px;
  max-width: 100%;
  @media all and (max-width: 550px) {
    overflow-y: auto;
    padding: 10px;
  }
`;

const ErrorGroup = styled.div`
  background-color: ${colors.WHITE};
  border-radius: 13px;
  border: solid 1px ${colors.BLUE_75};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 35px 57px;
  height: 100%;
  max-height: 100%;
  text-align: center;
  gap: 30px;
  @media all and (max-width: 550px) {
    border: none;
    padding: 0;
  }
`;

const ErrorIcon = styled.div`
  height: 100px;
  width: 100px;
  margin: 0 auto 10px;
`;

const ErrorTitle = styled.h2`
  color: #000;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.75px;
  @media all and (max-width: 400px) {
    font-size: 20px;
  }
`;

const ErrorText = styled(BodyMPrimary)`
  margin: 0 0 10px;
  line-height: 28px;
`;

export default function MissingPackage() {
  return (
    <SizeWrapper>
      <ErrorGroup>
        <ErrorTitle>Missing Package Information</ErrorTitle>
        <ErrorText>
          This page is not set up correctly. Please make sure you have the correct packageId in the URL, or contact us.
        </ErrorText>
        <PrimaryButton
          onClick={() => window.open("mailto:support@cerebrum.com?subject=Missing%20Registration%20Link", "_blank")}
          shadow
          text="Contact Us"
        />
      </ErrorGroup>
    </SizeWrapper>
  );
}
