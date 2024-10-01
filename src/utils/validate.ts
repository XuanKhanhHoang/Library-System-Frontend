export function isValidVietnamesePhoneNumber(phoneNumber: string): boolean {
  const regex = /^(0|(\+84))([3|5|7|8|9])+([0-9]{8})$/;
  return regex.test(phoneNumber);
}
