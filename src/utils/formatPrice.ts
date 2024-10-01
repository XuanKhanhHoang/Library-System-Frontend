export default function formatCurrency(amount: number): string {
  return amount.toLocaleString("vi-VN") + " đ";
}
