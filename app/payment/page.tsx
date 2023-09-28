"use client"
import { useState } from 'react'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLIC_SECLET as string)


const Home = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  )
}
export default Home

const PaymentForm = () => {
  const [cardholderName, setCardholderName] = useState('')
  const stripe = useStripe()
  const elements = useElements()
  return (
    <form onSubmit={async (e) => {
      e.preventDefault()
      if (!stripe || !elements) return
      const cardElement = elements.getElement(CardElement)
      console.log(cardElement);
      
      if (!cardElement) return
      const { token, error } = await stripe.createToken(cardElement, {
        name: cardholderName,
      })
      console.log(token);
      
      if (error) {
        alert(error.message)
        return
      }}
      }
    className='w-1/3 mx-auto my-8 p-8 bg-gray-500 rounded-md'
    >
      <fieldset>
        <legend>カード所有者</legend>
        <input type="text" value={cardholderName} onChange={e => setCardholderName(e.target.value)} className='text-black bg-white px-4 py-1 rounded-md'/>
      </fieldset>
      <fieldset>
      <legend>
        カード番号</legend>
        <CardElement options={{hidePostalCode: true}} className='bg-white px-4 py-2 rounded-md'/>
      </fieldset>
      <button className="bg-lime-600 px-4 py-2 rounded-md" type="submit">注文する</button>
    </form>
  )
}