import React, { Component } from 'react'
import Web3 from 'web3'
import NFTAbi from './NFT.json'
import { useState } from 'react'
//import { ethers } from "./dist/ethers.min.js"
import { Spinner } from 'react-bootstrap'
import { create } from "ipfs-http-client";
import './App.css';
import { Buffer } from 'buffer';
import { useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
const cors = require('cors')

//import BigNumber from 'bignumber';

const projectId = 'ZZZZZZZZZZZZZ';   //(Step 3. Place the project id from your infura project)
const projectSecret = 'XXXXXXXXX';  //(Step 4. Place the project_secrect from your infura project)

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client  = create({
   host: "ipfs.infura.io",
   port: 5001,
   protocol: "https",
   apiPath: "/api/v0",
   headers: {
     authorization: auth,
  },
  });

//export default class Create  extends Component {
const Create = ({ marketplace, nft, account }) => {

const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')


const uploadToIPFS = async (event) => {
    event.preventDefault()

//    event.preventDefault()
    const file = event.target.files[0]
if (typeof file !== 'undefined') {
      try {
          const result = await client.add(file)
          const url = `https://infura-ipfs.io/ipfs/${result.path}`
          console.log("upload to IPFS url", url )
          //this.setState( { url: url })
          setUrl(url)
          console.log("IPFS URI: ", url)
      } catch (error){
        console.log("ipfs image upload error: ", error)
      }
    }
}


const  createNFT = async() =>  {

    var image1 = "https://ipfs.io/ipf"
    let image = "https://ipfs.io/ipfs"

    if (!image || !price || !name || !description) return
    try{
        const jsonData1 = JSON.stringify({image, price, name, description});
        console.log("The JSON.parse(jsonData1)");
        console.log(JSON.parse(jsonData1));
        console.log("this is the url value")
        console.log("url=======>", url)
        console.log("url=======>", url)
        console.log("JSON.stringify", JSON.stringify({image, price, name, description}))
    // change from image to url
    console.log("urlX=*=>",url)
    console.log("imageX=*=>", image)
    let image2 = "https://ipfs.io/ipfs/2m"
    console.log("image2", image2)

    image = url

    const result = await client.add(JSON.stringify({image  , price, name, description}))

//const result = await client.add(JSON.stringify({image , price, name, description}))

   const uri = `https://infura-ipfs.io/ipfs/${result.path}`

   console.log(" just before mint ", uri)

   const junk = `this is just junk`


await nft.methods.mint(uri).send({ gas: 3000000, from: account  });

//await nft.methods.mint(uri).send({ gas: 3000000, from: account  });

//dao    const id = await nft.methods.tokenCount().send({ gas:3000000, from: account } );
//dao    console.log("token count   id = ", id)
// this doesn't work!!!!

    const id3 = await nft.methods.tokenCount().call();
    console.log("token count   id3 = ", id3)
// this doesn't work!!!!

    await  nft.methods.setApprovalForAll( marketplace.options.address, true).send({gas: 3000000, from : account});

    console.log("called setapp / setApprovalForAll")
    let etherAmount = "1.0";
	

    console.log("price", price)
    console.log("price.toString()", price.toString())

	    //pritn.toString()
    //const listingPrice = ethers.utils.parseEther(etherAmount.toString())
  
    const listingPrice = ethers.utils.parseEther(price.toString())
     
    console.log("**the listing price", listingPrice);
    console.log("finished with listing price");
// does not work    await marketplace.methods.makeItem(nft.options.address, id3,listingPrice).send({ gas: 800000, from : account});
        await marketplace.methods.makeItem(nft.options.address, id3,listingPrice).send({ gas: 300000, from : account});



	    console.log("finished makeItem")

    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }

//render() {
        return (
     <>

                <div>
                <h2> create it!   </h2>
            </div>


          <div className="App">
      <h1>marketplace mint example</h1>
      <input
        type="file"
        onChange={uploadToIPFS}
      />
<input
        onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
      <input onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
      <input  onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
             </div>
  <button onClick={createNFT}> createNFT</button>




</>

        )
//    }
}
export default Create








