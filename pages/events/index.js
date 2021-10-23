import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

export default function EventsPage({events, page, total}) {

  return (
    <Layout>
      <h1>Events</h1>
      {
        events?.length === 0
        &&
        <h3>
          No events to show
        </h3>
      }
      {
        events?.map(event => (
          <EventItem key={event.id} evt={event}/>
        ))
      }
      <Pagination page={page} total={total}/>
    </Layout>
  )
}

export async function getServerSideProps({query:{page = 1}}) {

  // Calculate Start Page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  //Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  // Fetch Events
  const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  const events = await eventRes.json();


  return {
    props: {events, page: +page, total}
  }
}