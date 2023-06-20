import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between w-full pt-3 mb-10' ><img src={logo} alt="" className='w-28 object-contain'/>
        <button className='black_btn'>Github</button>
        </nav>
        <h1 className='head_text'>
            Summarise Articles with <br className='max-md:hidden'/><span className='orange_gradient'>OpenAI GPT-4</span>
        </h1>
        <h2 className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, inventore expedita officiis quam rerum, voluptates autem, corrupti neque dolor nam aspernatur! Et ducimus ad eaque. Veniam earum autem nesciunt ab!</h2>
    </header>
  )
}

export default Hero