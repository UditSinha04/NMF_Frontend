import React from 'react'

export default function About() {
  return (
    <div className="py-16 bg-[#f6f6e9]">
      <div className="container m-auto px-6 text-gray-700 md:px-12 xl:px-6">
        <div className="space-y-10 md:space-y-0 md:flex md:gap-10 lg:gap-16">
          {/* Left: Image collage */}
          <div className="md:w-5/12 lg:w-5/12 flex flex-col gap-4">
            <img
              src="/Images/nmf logo.png"
              alt="Logo"
              className="rounded-2xl shadow-lg mb-2"
            />
            {/* <div className="flex gap-4">
              <img
                src="/Images/IMG_02.png"
                alt="Volunteers"
                className="rounded-lg shadow w-1/2"
              />
              <img
                src="/Images/IMG_03.png"
                alt="Helping hands"
                className="rounded-lg shadow w-1/2"
              />
            </div> */}
          </div>
          {/* Right: Text */}
          <div className="md:w-7/12 lg:w-6/12 text-justify">
            <h2 className="text-3xl text-gray-900 font-bold md:text-4xl mb-4">
              About Our Foundation
            </h2>
            <p className="mt-4 text-gray-700">
              <span className="font-semibold">NIRMALA MOHAN Foundation -</span> The motivation for starting this foundation and doing social service, the main role model, mentor and the continued inspiration for us is our father, Lion SHASTRY MOHAN.
            </p>
            <p className="mt-4 text-gray-700">
              Our dad served the society till his last breath, he was very actively involved in all the social activities and played the role of Lions Club District Governor. We learned many things from our father who is a role model for many people, as it is said every dad is the role model and hero for their kids.
            </p>
            <p className="mt-4 text-gray-700">
              Our mother Smt NIRMALA, a Carnatic classical singer, very active in social activities also served as the president for Lioness club of Kamareddy.
            </p>
            <p className="mt-4 text-gray-700">
              Shastry Kalpana, the eldest one, plays a major role in guiding and supporting all the events. She cares and encourages her brothers to do more social activities and serve the society.
            </p>
            <p className="mt-4 text-gray-700">
              Shastry Ravikanth, who is the elder one among the three brothers looks after the family business and actively involves in many social activities and is always ready to help the people whenever needed.
            </p>
            <p className="mt-4 text-gray-700">
              Shastry Shashikanth, the middle one is a Software Engineer by profession, qualified in Engineering and MBA gives his time whenever he is free to serve the society.
            </p>
            <p className="mt-4 text-gray-700">
              Dr Srikanth Shastry, the youngest one among the three brothers, completed MBBS and MD in Pathology, took initiation in starting this foundation. Being a medical professional and doctor, he is concerned about educating people and create health awareness in the society.
            </p>
            <p className="mt-4 text-gray-700">
              We three brothers started this foundation on our parents name to create awareness among people about cancer screening programmes like MAMMOGRAM and PAP SMEAR test which are the basic screening tests for every female to detect early stages of breast cancer and cervical cancer.
            </p>
            <p className="mt-4 text-gray-700">
              Both Mammogram and Pap smear tests are costly investigations which a normal person cannot afford to get them done. With the help of our foundation we will do this screening tests along with diabetic and hypertension check ups at a lowest price, so that it will be affordable to every individual.
            </p>
            <p className="mt-4 text-gray-700">
              The word Cancer itself will kill any person before it is diagnosed. We want to educate people about screening techniques and will guide them about the treatment and further management.
            </p>
            <p className="mt-4 text-gray-700">
              In India, only 1 in every 2 girls have knowledge about menstruation before their first menstrual period. Menstrual hygiene management is a major health issue affecting women and girls of reproductive age worldwide. School aged girls in many villages face the largest barriers to Menstrual hygiene, as many schools do not have the necessary facilities, supplies, knowledge and understanding to appropriately support girls during menstruation.
            </p>
            <p className="mt-4 text-gray-700">
              Our foundation will provide <span className="font-semibold">SANITARY NAPKINS, FREE OF COST</span> by conducting health camps in school and colleges and educate girls about menstrual hygiene.
            </p>
            <p className="mt-4 text-gray-700">
              Our foundation concentrates mainly on <span className='font-semibold'>HEALTH AND EDUCATION</span> which are the most basic things in every human being life.
            </p>
            <p className="mt-4 text-gray-700">
              Every living being requires certain basic things to lead a peaceful life. While things like clothes and shelter affect the quality of life, the absence of food can snatch life itself. "Annadanam" is made up of two words - 'Annam' which means food and 'danam' which means the act of giving or donating.
            </p>
            <p className="mt-4 text-gray-700">
              Annadanam is called the 'Mahadanam' among the various kinds of danam. The other kind of danam like 'bhoodanam', 'godanam' and 'arthadanam' are charity done by the rich and those who have the means to do so, whereas annadanam is within the reach of a layperson with just the bare necessities who could do danam.
            </p>
            <p className="mt-4 text-gray-700">
              Charity in the form of annadanam is a way in which you can contribute to life itself. The wise men of ancient India called hunger the greatest disease. It is a disease that afflicts everyone and there is no cure for it.
            </p>
            <p className="mt-4 text-gray-700">
              You can join us on one's Birthdays, Marriage anniversaries, Remembrance days, Festivals and other occasions.
            </p>
            <p className="mt-4 text-gray-700">
              <span className="italic font-semibold">If you can’t feed a hundred people. Then feed just one.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}