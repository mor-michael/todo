'use client'
import Link from "next/link"

import { switchPage, Page, toggleMenu} from "@/redux/features/nav-slice"
import { useDispatch } from "react-redux"
import { useAppSelector } from "@/redux/store"
import { DashboardIcon, MenuIcon, NotificationIcon, SettingsIcon, StatsIcon } from "../_assets/navbar-icons"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const NavButton = ({name, icon, color, page}: {name: string, icon: JSX.Element, color: string, page: Page}) => {
  const dispatch = useDispatch()
  const handleSwitchPage = (page: Page) => {
    dispatch(
      switchPage({page: page})
    )
  }
  return(
    <Link prefetch href={name !== 'Dashboard' ? name : '/'} onClick={() => handleSwitchPage(page)} className="flex mx-auto ml-6 xl:ml-[40px]">
      {icon} 
      <span style={{color: color}} className="ml-4">{name}</span>
    </Link>
  )
}

export default function Navbar() {
  const currentPage = useAppSelector((state) => state.navReducer.page)
  const pathname = usePathname()
  const dispatch = useDispatch()
  useEffect(() => {
    const page = (() => {
      switch(pathname) {
        case '/Statistics':
          return Page.Statistics
        case '/Settings':
          return Page.Settings
        case '/Notifications':
          return Page.Notifications
        default:
          return Page.Dashboard
      }
    })()
    dispatch(
      switchPage({page: page})
    )
  }, [pathname, dispatch])
  const menuState = useAppSelector((state) => state.navReducer.menuToggle)

  const handleToggleMenu = () => {
    dispatch(
      toggleMenu({})
    )
  }
  return(
    <>
      <button onClick={handleToggleMenu} className="z-20 absolute sm:hidden"><MenuIcon fill={menuState ? '#FFF' : '#000'} /></button>
      <div className={`bg-[#0C0B0B] ${menuState ? 'flex' : 'hidden'} h-full top-0 left-0 z-10 absolute sm:static sm:flex flex-col w-[50%] sm:w-[220px] xl:h-[853px] xl:m-6 rounded-r-2xl sm:rounded-3xl`}>
        <p className="text-white hidden xl:block mx-auto mt-8 text-5xl">TODO</p>
        <div className="flex flex-col gap-y-14 mt-16">
          <NavButton page={Page.Dashboard} name="Dashboard" color={currentPage === Page.Dashboard ? "#FFFFFF" : "#B3B3B3"} icon={<DashboardIcon fill={currentPage === Page.Dashboard ? "#FFFFFF" : "#B3B3B3"} />} />
          <NavButton page={Page.Statistics} name="Statistics" color={currentPage === Page.Statistics ? "#FFFFFF" : "#B3B3B3"} icon={<StatsIcon fill={currentPage === Page.Statistics ? "#FFFFFF" : "#B3B3B3"} />} />
          <NavButton page={Page.Notifications} name="Notifications" color={currentPage === Page.Notifications ? "#FFFFFF" : "#B3B3B3"} icon={<NotificationIcon fill={currentPage === Page.Notifications ? "#FFFFFF" : "#B3B3B3"} />} />
          <NavButton page={Page.Settings} name="Settings" color={currentPage === Page.Settings ? "#FFFFFF" : "#B3B3B3"} icon={<SettingsIcon fill={currentPage === Page.Settings ? "#FFFFFF" : "#B3B3B3"} />} />
        </div>
      </div>
    </>
  )
}