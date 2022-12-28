import { useContext } from 'react';
import { AppContext } from "../../store"
import HomePageNav from './HomePageNav'
import StoreNav from './StoreNav'

export default function MainNav() {
  const { user } = useContext(AppContext);
  const pathname = window.location.pathname;
// conditionally render navbars
  if (pathname.includes("/store") || pathname.includes("/product")) {
    return <StoreNav user={user}/>
  }
  return (
    <HomePageNav user={user}/>
  )
}
