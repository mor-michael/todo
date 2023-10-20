'use client'

import { useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { calculateUserStats } from "@/redux/features/user-slice";

import { ResponsiveLine } from '@nivo/line'

const WeeklyStats = ({ data }: {data: any}) => (
  <ResponsiveLine
    axisLeft={{
      format: e => (Math.floor(e) === e && e) !== false ? Math.floor(e) === e && e : ""
    }}
    colors={d => d.color}
    lineWidth={3}
    curve='monotoneX'
    enablePoints={false}
    enableGridX={false}
    data={data}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    xScale={{ type: 'point' }}
    yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false
    }}
    useMesh={true}
    legends={[{
              anchor: 'top-left',
              direction: 'column',
              justify: false,
              translateX: 0,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
            }]}
  />
)

const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export default function Statistics() {
  const todoArr = useAppSelector((state) => state.todoReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      calculateUserStats({todos: todoArr}) 
    )
  }, [todoArr, dispatch])
  const thisWeekTodoStats = useAppSelector((state) => state.userReducer.hoursPerDayThisWeek)
  const lastWeekTodoStats = useAppSelector((state) => state.userReducer.hoursPerDayLastWeek)
  const legendWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const thisWeek = thisWeekTodoStats.map((hours, index) => {return {'x': legendWeekDays[index], 'y': hours}})
  const lastWeek = lastWeekTodoStats.map((hours, index) => {return {'x': legendWeekDays[index], 'y': hours}})
  const data = [
    {
      'id': 'last week',
      'color': 'hsl(0, 0%, 72%)',
      'data': lastWeek
    },
    {
      'id': 'this week',
      'color': 'hsl(0, 0%, 28%)',
      'data': thisWeek
    }
  ]
  return(
    <div className="mt-[10px] xl:mt-[50px]">
      <p className=" xl:text-2xl font-medium">Your statistics</p>
      <div className="w-[350px] h-[250px] xl:w-[620px] xl:h-[450px]">
        <WeeklyStats data={data} />
      </div>
    </div>
  )
}