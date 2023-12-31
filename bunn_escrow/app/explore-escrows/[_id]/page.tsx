export default function TransactionDetailsPage({
  params,
}: {
  params: { _id: number };
}) {
  return <div>{params._id}</div>;
}
