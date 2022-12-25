import HomePageNav from './HomePageNav'
import StoreNav from './StoreNav'
export default function MainNav() {

  const pathname = window.location.pathname;
  console.log(pathname);
  if(pathname.includes("/store")|| pathname.includes("/product")){
    return <StoreNav/>
  }
  return (
    <HomePageNav/>
  )
}
