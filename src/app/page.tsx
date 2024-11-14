import CheckoutButton from './components/CheckoutButton';

export default function Home() {
  // console.log("Publishable Key: "+process.env.PUBLISHABLE_KEY)
  return (
    <div>
      <h1>Home</h1>
      <CheckoutButton/>
    </div>
  );
}
