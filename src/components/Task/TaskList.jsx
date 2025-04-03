import { Text } from '@parssa/universal-ui';

const TaskList = () => {
  return (
    <div id="TaskList" className="h-[50%]  overflow-x-auto w-full mt-11 py-5 flex items-center flex-nowrap justify-start gap-5">
        <div className="h-full w-[300px] bg-yellow-400 flex-shrink-0  rounded-lg p-5">
             <div className="flex justify-between items-center">
                <h3 className="bg-red-400 px-3 py-1 rounded text-sm">
                    High
                </h3>
                <h4 className=" text-sm font-bold">20 Feb 2025</h4>
             </div>
             <h2 className="text-lg mt-6 font-bold">
                Make a youtube video on React
             </h2>
             <p className="text-sm mt-3">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ex quod ipsam dignissimos recusandae atque.
             </p>
        </div>

        <div className="h-full w-[300px] bg-blue-400 flex-shrink-0  rounded-lg p-5">
             <div className="flex justify-between items-center">
                <h3 className="bg-red-400 px-3 py-1 rounded text-sm">
                  Low
                </h3>
                <h4 className=" text-sm font-bold">19 Feb 2025</h4>
             </div>
             <h2 className="text-lg mt-6 font-bold">
               Edit some photos
             </h2>
             <p className="text-sm mt-3">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ex quod ipsam dignissimos recusandae atque.
             </p>
        </div>
        <div className="h-full w-[300px] bg-green-400 flex-shrink-0  rounded-lg p-5">
             <div className="flex justify-between items-center">
                <h3 className="bg-red-400 px-3 py-1 rounded text-sm">
                    Low
                </h3>
                <h4 className=" text-sm font-bold">20 Feb 2025</h4>
             </div>
             <h2 className="text-lg mt-6 font-bold">
                Make thumbnails for the video
             </h2>
             <p className="text-sm mt-3">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ex quod ipsam dignissimos recusandae atque.
             </p>
        </div>
        <div className="h-full w-[300px] bg-gray-400 flex-shrink-0  rounded-lg p-5">
             <div className="flex justify-between items-center">
                <h3 className="bg-red-400 px-3 py-1 rounded text-sm">
                    Medium
                </h3>
                <h4 className=" text-sm font-bold">22 Feb 2025</h4>
             </div>
             <h2 className="text-lg mt-6 font-bold">
                Upload the video on youtube
             </h2>
             <p className="text-sm mt-3">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ex quod ipsam dignissimos recusandae atque.
             </p>
        </div>
        <div className="h-full w-[300px] bg-orange-400 flex-shrink-0  rounded-lg p-5">
             <div className="flex justify-between items-center">
                <h3 className="bg-red-400 px-3 py-1 rounded text-sm">
                    High
                </h3>
                <h4 className=" text-sm font-bold">28 Feb 2025</h4>
             </div>
             <h2 className="text-lg mt-6 font-bold">
                Make a youtube video on React
             </h2>
             <p className="text-sm mt-3">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ex quod ipsam dignissimos recusandae atque.
             </p>
        </div>
    </div>
  )
}

export default TaskList