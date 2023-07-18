import Head from 'next/head'
import Link from 'next/link'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react';
import { Token1abi , Token1Address} from '../contants';
import Web3Modal from 'web3modal';
import {ethers, providers , Contract , BigNumber , utils} from 'ethers';
export default function Home() {
    const zero = BigNumber.from(0);
  const [walletConnected , setwalletConnected] = React.useState(false)
  const [balanceOfAmanDevTokens ,setbalanceOfAmanDevTokens] = React.useState(zero);
      const [TokenMinted , setTokenMinted] = React.useState(zero);
  const [loading , setloading] = React.useState(false);
  const [ input , setinput] = React.useState();
  const [input2 , setinput2] = React.useState();
  const [subt , setsubt ] = React.useState();
    const [bnbBalances , setbnbBalance] = React.useState();
  const [ bnbNetwork , setbnbNetwork] = React.useState(false);
  const [ polygonnetwork , setgoerli] = React.useState(false);
    const [userAddress, setuserAddress]=React.useState();
  const [token1balance , settoken1balance]=React.useState("");
    const [token2balance , settoken2balance]=React.useState("");

 const [ Enable , setEnable] = React.useState();
const [reverse , setreverse] = React.useState(false);
  const ModelRef= React.useRef();
  const getSignerOrProvider = async(needSigner = false) =>{
    const provider = await ModelRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const {chainId} = await web3Provider.getNetwork();
        if(reverse == false && chainId == 97){
          setbnbNetwork(true);
    }else if(reverse == true && chainId == 80001){
      setgoerli(true);

    }else{
      if(reverse != true){
      window.alert("Change Your Network to BNB Network");
      throw new Error("Change Your Network to BNB Network");
      }else if (reverse != false){
      window.alert("Change Your Network to polygon Network");
      throw new Error("Change Your Network to polygon Network");
      }

    }

    if(needSigner ){
      const signer = await web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  }
  const handleChange= async (e) =>{
        if (e.target.value < 0) {
          notifynega();
          setinput2("");
  }else{
     setinput(e.target.value);
  }
  }
  console.log(input);


  const getBlanceTokenAmanDevToken = async() =>{
    try{
    const provider = await getSignerOrProvider();
      const signer = await getSignerOrProvider(true);
      const address = await signer.getAddress();
      setuserAddress(address);

    }catch(err){
      console.error(err);
    }
  }
      const notify1 = () => toast.success('Bridge Successful', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});

  function redirect (){
      setTimeout(function() {
    window.location.replace("/poly-bnb");

}, 2500);
};
  const notifyinvalid = () => toast.error(' Please Enter Valid amount ! ', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});

  const notifydecimal = () => toast.error(' You cannot enter more than 8 digits after the decimal ', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
  const notifynega = () => toast.error(' Negative amount is not allowed!', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});

  const notify2 = () => toast.error('You dont have enough amount to Bridge', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
  const notify3 = () => toast.error(' You denied transaction signature.', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});

  const notify = () => toast.success('Please wait ! , You will receive your Token shortly ', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});

  const approval= async() =>{

    try{
      networkalert();
       getBlanceTokenAmanDevToken();

      console.log(userAddress);
      const provider1 = await getSignerOrProvider(true);
      const contract = new Contract(Token1Address, Token1abi, provider1);
      const amount = ethers.utils.parseUnits(input , 8);
      const balance = await contract.burn(amount);
                  setEnable(true);
      await balance.wait();
            setsubt(true);
      notify();
       
            if(!reverse){
try{
        const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/qDunlKrTnLzKZVZ97u16nTJRE0xglKsL'); // use the appropriate BSC testnet endpoint
      const privateKey ="858bf3089d09c24eb8a19f42fd271b39dfab65666f25e8ce51ad54f993d776a4";
        const signer = new ethers.Wallet(privateKey, provider);
    const myContract = new Contract(Token1Address , Token1abi , signer);
const inputETh = ethers.utils.parseUnits(input , 8);
    const _tokenMinted = await myContract.mint(userAddress, inputETh ,{ gasLimit: 1000000 });
            await _tokenMinted.wait();
      notify1();
      redirect();

}catch(err){

  console.error(err);
                            if (err.message.includes('execution reverted: ERC20: burn amount exceeds balance')) {
notify2();
                          }

}


}else{

try{
        const provider = new ethers.providers.JsonRpcProvider('https://wiser-old-wildflower.bsc-testnet.discover.quiknode.pro/a17c196f848795c42d0000e1e2e4146ea3ca7001/'); // use the appropriate BSC testnet endpoint
      const privateKey ="858bf3089d09c24eb8a19f42fd271b39dfab65666f25e8ce51ad54f993d776a4";
        const signer = new ethers.Wallet(privateKey, provider);
    const myContract = new Contract(Token1Address , Token1abi , signer);
const inputETh = ethers.utils.parseUnits(input , 8);
    const _tokenMinted = await myContract.mint(userAddress, inputETh ,{ gasLimit: 1000000 });
            await _tokenMinted.wait();
      notify1();
      redirect();

}catch(err){

  console.error(err);
                            if (err.message.includes('execution reverted: ERC20: burn amount exceeds balance')) {
notify2();
                          }

}

}
    }catch(err){
      console.error(err);
                          if (err.message.includes('execution reverted: ERC20: burn amount exceeds balance')) {
notify2();
                          }
             if (
    err.message.includes('fractional component exceeds decimals') &&
    err.message.includes('NUMERIC_FAULT')
  ) {
               notifydecimal();
  }
                                      if (err.message.includes('invalid decimal value')) {
                                  notifyinvalid();
                                }



    }
  }
const reverseswaps = async ()=>{
  if(reverse == true){
    setreverse(false);
        switchTopolygon1();
            setinput("");
        setinput2("");


  }else{
    setreverse(true);
        switchTopolygon();
            setinput("");
        setinput2("");

  }
  console.log(reverse);

}


    const networkalert = () =>{
      console.log(reverse);
      try{

      }catch(e){
        console.error(e);
      }

    }

    const BlanceToken1 = async() =>{
    try{
            const signer = await getSignerOrProvider(true);
      const address = await signer.getAddress();
    const provider1 = new ethers.providers.JsonRpcProvider('https://wiser-old-wildflower.bsc-testnet.discover.quiknode.pro/a17c196f848795c42d0000e1e2e4146ea3ca7001/'); // use the appropriate BSC testnet endpoint
      const contracts = new Contract(Token1Address, Token1abi, provider1);
      const balance1 = await contracts.balanceOf(address);
      settoken2balance(ethers.utils.formatUnits(balance1 , 8));
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/qDunlKrTnLzKZVZ97u16nTJRE0xglKsL'); // use the appropriate BSC testnet endpoint
      const contract = new Contract(Token1Address, Token1abi, provider);
      const balance = await contract.balanceOf(address);
      settoken1balance(ethers.utils.formatUnits(balance , 8));
console.log(balance);
    }catch(err){
      console.error(err);
    }
  }
  const BNBbalance = async() =>{
    try{
      const signer = await getSignerOrProvider(true);
      const address = await signer.getAddress();
      if(polygonnetwork){
    const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/Vl1iJFNY1_v7HfyKUXhkmsGEuL8t_IHc'); // use the appropriate BSC testnet endpoint
try{
  const balance = await provider.getBalance(address);
const userbnbBalance = ethers.utils.formatEther(balance);
    setbnbBalance(userbnbBalance);

}catch(err){
      console.error(err);
}
}else if(bnbNetwork){
    const provider = new ethers.providers.JsonRpcProvider('https://wiser-old-wildflower.bsc-testnet.discover.quiknode.pro/a17c196f848795c42d0000e1e2e4146ea3ca7001/'); // use the appropriate BSC testnet endpoint
  try{
  const balance = await provider.getBalance(address);
const userbnbBalance = ethers.utils.formatEther(balance);
    setbnbBalance(userbnbBalance);

}catch(err){
      console.error(err);
}


}

    }catch(err){
      console.error(err);
    }
  }


  const balanceAndAddress = async() =>{
    if(walletConnected){
    await   getBlanceTokenAmanDevToken();
     await BlanceToken1();
await BNBbalance();
    }
  }

const switchTopolygon1 = async () => {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: '0x61', // Binance Smart Chain Testnet chain ID
          },
        ],
      });
      console.log('Switched to Binance Smart Chain Testnet successfully!');
    } catch (error) {
      console.error(error);
    }
  }
};

const switchTopolygon = async () => {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    try {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x13881', // Polygon Testnet (Mumbai) chain ID
            chainName: 'Polygon Testnet',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18,
            },
            rpcUrls: ['https://polygon-mumbai.g.alchemy.com/v2/qDunlKrTnLzKZVZ97u16nTJRE0xglKsL'], // Polygon Testnet (Mumbai) RPC URL
            blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com'], // Polygon Testnet (Mumbai) block explorer URL
          },
        ],
      });
      console.log('Switched to Polygon Testnet successfully!');
    } catch (error) {
      console.error(error);
    }
  }
};




  const connectWallet = async () =>{
    try{
          await getSignerOrProvider();
      setwalletConnected(true);
    }catch(err){
      console.error(err);
    }
  }
  React.useEffect(()=>{
    if(!walletConnected){
      ModelRef.current = new Web3Modal({
        networks:"goerli",
        providerOptions:{},
        disabledInjectedProvider:false,
      })
      connectWallet();
    }
          balanceAndAddress();

  },[walletConnected]);
  return (
    <>
    <Head>
		  <div class="area" >
		</div>

    <title>Crosschain Bridge</title>
    </Head>
    <header class="text-gray-600 body-font headertop">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <ToastContainer />
    <a class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
      <span class=" text-xl">Crosschain Bridge</span>
    </a>
    <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <a href="/" class="mr-5 text-white">Swap POLRON(Goerli) - POLRON(BSC)</a>

    </nav>
        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <a href="/poly-eth" class="mr-5 text-white">Swap POLRON(Goerli) - POLRON(polygon)</a>
    </nav>

    <button onClick={connectWallet} class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"><img className="h-5 w-5 mr-2" src="favicon.png" />{walletConnected ? "Connected" : "Connect Wallet"}
    </button>
  </div>
</header>

 <section class="body-font relative middle_box">
  <div class="container mx-auto">
    <div class="flex flex-col w-full mb-8">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white "> Crosschain Bridge </h1>
      <p class=" leading-relaxed text-white ">Here you can swap POLRON(BSC) to POLRON(polygon)</p>
    </div>
  <div class="row">
 <div class="box-50">
  <div class="box_white">
    <form >
                                            <div class=""><span class="text-gray-600">Wallet Address: {userAddress}</span></div>
	 <div class="value_top">
    {
      !reverse?
          <div class="">Token Balance: <span>{token2balance}</span> POLRON(BSC)</div>

      :
                <div class="">Token Balance: <span>{token1balance}</span> POLRON(polygon)</div>


    }
          </div>
      <div class="">
        { !reverse ?
          <div>
                  <div class="p-2 w_1_box mb-3">
            <label for="name" class="leading-7 text-gray-600"><b>POLRON(BSC)</b></label>
			<div class="input_box">
        { !Enable ? 
                    <input type="number" onChange={handleChange} id="name" name="name" min="0" maxlength="7" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out" required/>



:
              <input type="number" disabled={true}  id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out" required/>

    }
            <div class="input_right">
			 <img className="h-7 ml-2" src="envo.png" />
			 <img className="h-7 ml-2" src="bnb.png" />
            </div>
		  </div>

        </div>
                        			 <img className="h-7 mb-[5px] ml-[15.5rem] mt-[9px] cursor-pointer" src="up-down.png" onClick={()=>reverseswaps()}/>

                    <div>


		<p class="mb-2 text-gray-600">swap rate: 1:1 (1 POLRON(BSC) = 1 POLRON(polygon))</p>
                   <div class="p-2 w_1_box mb-2">
            <label for="email" class="leading-7 text-gray-600"><b>POLRON(polygon)</b></label>
			<div class="input_box">
            <input type="number" id="name" name="name" disabled = {true} class=" w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3  transition-colors  duration-200 ease-in-out" placeholder={input} />
             <div class="input_right">
			<img className="h-7 ml-2" src="envo.png" />
			<img className="h-7 ml-2" src="bnb.png" />
            </div>
		 </div>
        </div>

</div>


          </div>
:
                    <div>


                    <div>


                   <div class="p-2 w_1_box mb-2">
            <label for="email" class="leading-7 text-gray-600"><b>POLRON(polygon)</b></label>
			<div class="input_box">
        { !Enable ? 
                        <input type="number" onChange={handleChange} id="name" min="0" maxlength="7" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out" required/>



:
              <input type="number" disabled={true}  id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out" required/>

    }



             <div class="input_right">
			<img className="h-7 ml-2" src="envo.png" />
			<img className="h-7 ml-2" src="bnb.png" />
            </div>
		 </div>
        </div>

</div>

                                  			 <img className="h-7 mb-[5px] ml-[15.5rem] mt-[9px] cursor-pointer" src="up-down.png" onClick={()=>reverseswaps()}/>
                    		<p class="mb-2 text-gray-600">swap rate: 1:1 (1 POLRON(polygon) = 1 POLRON(BSC))</p>


                  <div class="p-2 w_1_box mb-3">
            <label for="name" class="leading-7 text-gray-600"><b>POLRON(BSC)</b></label>
			<div class="input_box">
                      <input type="number" id="name" name="name" disabled = {true} class=" w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3  transition-colors  duration-200 ease-in-out" placeholder={input} />

            <div class="input_right">
			 <img className="h-7 ml-2" src="envo.png" />
			 <img className="h-7 ml-2" src="bnb.png" />
            </div>
		  </div>

        </div>


          </div>






        }




        { !Enable ? 
            <div class="p-2 w-full">
              <button type="button" onClick={approval} class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Bridge Token</button>
        </div>

      : 

        <div class="p-2 w-full">
          <button type="button" disabled={true}  class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"> {!subt ? "Loading..." : " Receiving Token..."} </button>
        </div>
    }

      </div>
    </form>
    </div>
  </div>
  
  
  </div>
  
  
  
  
  
  </div>
</section>
        <footer className={styles.footer}>
              <p class=" leading-relaxed text-gray-600 ">        Made with &#10084; by Aman.eth 
</p>

      </footer>

    </>
  )
}





