type SendVerificationCodeResponse = {
  accepted: string[];
  envelope: {
    from: string;
    to: string[];
  };
};

export { type SendVerificationCodeResponse };
