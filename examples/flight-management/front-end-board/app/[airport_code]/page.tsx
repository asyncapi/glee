import Flights from '../../components/Flights'

export default async function HomePage({ params }: any) {
  const airportCode = params.airport_code

  return (
    <div>
      <Flights airportCode={airportCode} />
    </div>
  )
}
