// import React, { Component } from "react";
import React, { useEffect, useState } from "react";
import EthSwap from "../abis/EthSwap.json";
import Token from "../abis/Token.json";
import Web3 from "web3";
import Navbar from "./Nav";
import swal from "sweetalert";
import "./App.css";
import Main from "./main";
import { makeStyles, createMuiTheme, ThemeProvider } from "@mui/styles";
import Image from "../eth2.jpg";

const App = () => {
  // we are making states
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState(0);
  const [balanceAsEther, setbalanceAsEther] = useState();
  const [tokenBal, setTokenBal] = useState(0);
  const [token1, setToken1] = useState();
  const [LWCswap, setLWCSwap] = useState();
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  // const LdWeb3 = async () => {
  //   await loadWeb3();
  //   console.log(window.web3);
  // };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    // console.log(account);
    const ethBalance = await web3.eth.getBalance(accounts[0]);
    setBalance(ethBalance);
    setbalanceAsEther(web3.utils.fromWei(ethBalance, "Ether"));
    // const abi = Token.abi;
    // const networkId = await web3.eth.net.getId();
    // const address = Token.networks[networkId].address;
    // const token = new web3.eth.Contract(abi, address);

    // ##################

    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];
    if (tokenData) {
      // you need to creae the contract instane 👇
      /* so abi is telling you how code is work you can interact with it
       so may be you have multiple smart contract and same abi code but 
       you need to tell the address of smart contract where this smart 
     contract is placed.*/

      // ##### we are loading the token ###
      const token = new web3.eth.Contract(Token.abi, tokenData.address);

      let tokenBal = await token.methods.balanceOf(accounts[0]).call();
      setTokenBal(tokenBal.toString());
      // console.log(tokenBal.toString());
    } else {
      swal(
        "Oops",
        "Sorry Unfortunately contract is not deployed to this selected network. Please change your network ",
        "error"
      );
    }

    //##########################################

    // ##### we are loading the LWC Swap data Contract ###

    const LWCSwapData = EthSwap.networks[networkId];
    if (LWCSwapData) {
      // ##### we are loading the LWC Swap(Eth Swap) ###
      const LWCSwap = new web3.eth.Contract(EthSwap.abi, LWCSwapData.address);
      setLWCSwap(LWCSwap);
    } else {
      swal(
        "Oops",
        "Sorry Unfortunately LWCSwapcontract is not deployed to this selected network. Please change your network ",
        "error"
      );
    }

    setLoader(false); // when all step is done the remove the laoding from the page
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No wallet installed");
    }
  };
  // calling buy token function
  const buyTokens = async (etherAmount) => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const LWCSwapData = EthSwap.networks[networkId];
    setLoader(true);
    let tempAccount = await window.web3.eth.getAccounts();
    const LWCSwap = new window.web3.eth.Contract(
      EthSwap.abi,
      LWCSwapData.address
    ); // this is duplicate code
    LWCSwap.methods
      .buy_token()
      .send({ value: etherAmount, from: tempAccount[0] })
      .on("transactionHash", (hash) => {
        setLoader(false);
      });
  };

  // sell token function

  const sellTokens = async (tokenAmount) => {
    console.log(tokenAmount);
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const LWCSwapData = EthSwap.networks[networkId];
    const LWCSwap = new web3.eth.Contract(EthSwap.abi, LWCSwapData.address);
    // here token code start
    const tokenData = Token.networks[networkId];
    setLoader(true);
    let tempAccount = await window.web3.eth.getAccounts();
    const token = new web3.eth.Contract(Token.abi, tokenData.address); // this is duplicate code
    token.methods
      .approve(LWCSwap.address, tokenAmount)
      .send({ from: tempAccount[0] })
      .on("transactionHash", (hash) => {
        LWCSwap.methods
          .sellToken(tokenAmount)
          .send({ from: tempAccount[0] })
          .on("transactionHash", (hash) => {
            setLoader(false);
          });
      });
    // .approve(LWCSwapData.address, tokenAmount)
    // .send({ from: tempAccount[0] })
    // .on("transactionHash", (hash) => {
    //   console.log(hash);
    //   setLoader(false);
    // });
    // .sellToken(tokenAmount)
    // .send({ from: tempAccount[0] })
    // .on("transactionHash", (hash) => {
    //   setLoader(false);
    // });
  };

  let content;
  if (loading) {
    content = (
      <p id="loader" className="text-center">
        {" "}
        Loading....
      </p>
    );
  } else {
    content = (
      <Main
        etherBalance={balanceAsEther}
        tokenBalance={tokenBal}
        buyTokens={buyTokens}
        sellTokens={sellTokens}
      />
    );
  }

  const useStyles = makeStyles({
    root: {
      height: "100vh",
      backgroundImage: `url(${Image})`,
      backgroundSize: "cover",
      backgroundOpacity: "0.2",
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar account={account} />
      <div>
        <div>
          <main>
            <div>{content}</div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default App;
