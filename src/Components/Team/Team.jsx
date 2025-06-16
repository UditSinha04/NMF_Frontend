import React from 'react'

const foundationMembers = [
  { name: "Srikanth Shastry", img: "/Images/srikanth.jpg" },
  { name: "Kalpana Shastry", img: "/Images/Kalpana.jpg" },
  { name: "Sridhar Panatula", img: "/Images/sridhar.jpg" },
  { name: "Ravikanth Shastry", img: "/Images/Ravikanth.jpg" },
  { name: "Shashikanth Shastry", img: "/Images/Sashi.jpg" },
  { name: "K.Dayakar Rao", img: "/Images/dummy.jpg" },
  { name: "V.Praveen Kumar", img: "/Images/Praveen.jpg" },
  { name: "M. Chandrashekar Reddy", img: "/Images/dummy.jpg" },
  { name: "D N V S Surya Narayana Rao", img: "/Images/Suresh.jpg" }
];

const executiveMembers = [
  "Shastry Sruthi", "Shastry Padmaja", "Shastry Swetha",
  "M.Rajani Reddy", "N Santosh Kumar", "Dr Syeda Khadeja Fathima",
  "Dr. Manas Phukon", "Dr Roopshika Dutta", "Nagaraj Modur",
  "Manoj Patel Shirvi", "Anil Shastry", "Dr. G. Venugopal Rao",
  "Shashidar Bavikatti", "M. Adithya", "M.Mahesh Kumar",
  "Dr Sanjay C Biradar", "Deepak R V", "Shastry Rajkumar",
  "Dr Kaameshwari Prasad", "Dr Sreedhara Chary", "Dr Swetha Reddy",
  "Dr Suhela R"
];

function Team() {
  return (
    <div className="min-h-screen bg-[#f6f6e9] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2 tracking-wide">
          NIRMALA MOHAN FOUNDATION
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-700 mt-6 mb-8 tracking-wide">
          FOUNDING MEMBERS
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center mb-12">
          {foundationMembers.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-44 h-44 rounded-full overflow-hidden shadow-lg bg-gray-200 mb-3 border-4 border-[#f5f5dc]">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center text-gray-800 font-medium text-base md:text-lg">
                {member.name}
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-700 mt-10 mb-6 tracking-wide">
          EXECUTIVE MEMBERS
        </h2>
        <div className="bg-white/70 rounded-lg shadow p-6 md:p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
            {executiveMembers.map((name, idx) => (
              <div key={idx} className="text-gray-700 text-base md:text-lg font-normal">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team
