import Flights from '../../components/Flights'
export default async function HomePage({ params }: any) {
  return (
    <div>
      <Flights
        airportCode={params.airport_code}
        _icon='/flights.svg'
        _title='Admin Dashboard'
      />
    </div>
  )
}
