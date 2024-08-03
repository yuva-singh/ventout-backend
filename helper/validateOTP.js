const validateOTP = async (otpTime) => {
  try {
    const currentDateTime = new Date();
    const otpDateTime = new Date(otpTime);

    const differenceInMilliseconds = currentDateTime - otpDateTime;
    const differenceInMinutes = Math.abs(
      differenceInMilliseconds / (1000 * 60)
    );

    return differenceInMinutes > 2;
  } catch (error) {
    console.error("Error validating OTP:", error.message);
    return false;
  }
};

module.exports = validateOTP;
