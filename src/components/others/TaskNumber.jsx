/* eslint-disable react/prop-types */
const TaskNumber = () => {
  return (
    <div className="flex justify-between mt-10 gap-3 w-full">
        <TaskIndv color={"blue"} textColor={"white"} taskName={"New Task"} taskNumber={"0"}/>
        <TaskIndv color={"green"} textColor={"white"} taskName={"Completed"} taskNumber={"3"}/>
        <TaskIndv color={"yellow"} textColor={"black"} taskName={"Accepted"} taskNumber={"0"}/>
        <TaskIndv color={"red"} textColor={"white"} taskName={"Falied"} taskNumber={"1"}/>
    </div>
  )
}


const TaskIndv=({color,textColor,taskName,taskNumber})=>{
    return(
        <div className={`flex flex-col w-[45%] bg-${color}-400 py-6 px-10 rounded-lg`}>
        <h1 className={`text-3xl font-semibold text-${textColor}`}>{taskNumber}</h1>
        <h2 className={`text--2xl font-medium text-${textColor}`}>{taskName}</h2>
    </div>
    )
}





export default TaskNumber