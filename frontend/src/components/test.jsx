import logo from '../assets/onlylogo.png';
import NetworkMap from './networkMap';

const Intro = () =>{
  return(
    <>
    <div className="flex flex-col items-center gap-4">

      {/* title part */}
      <div className='flex flex-col'>
        <div className="flex items-center justify-center w-[296px] h-[92px] mt-8">
          <div className="flex items-center justify-center w-[227px] h-[60px] rounded-[204px] bg-[rgba(196,196,196,0.39)]">
            <div className='flex items-center gap-[5px]'> 
              {/* logopart */}
              <img
                className="h-[50px] w-[50px]" 
                src={logo}
                alt="Your Logo"
              />

              {/* textpart */}
              <div class="w-[132px] h-[38px] text-[rgb(55,65,81)] font-[Baumans] text-[32px] font-normal leading-[38px] tracking-[0px] text-left">
                SharedMate
              </div>
            </div> 
          </div>
        </div>

        {/* PunchLine */}
          <div class="w-[296px] h-[23px] text-[rgb(55,65,81)] font-[comfortaa] text-[20px] font-normal leading-[22px] tracking-[0px] text-left">
            Fair Spending - Fair Sharing
          </div>
      </div>

        <NetworkMap />

      
      
    </div>
    </>
  );
}

export default Intro;