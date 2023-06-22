import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
const cors = require('cors')

function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}
const Home = ({ marketplace, nft, account, account2 }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const loadMarketplaceItems = async () => {
    // Load all unsold items
  console.log("within the Home module")
  const itemCount = await marketplace.methods.itemCount().call()
  console.log("itemCount = ", itemCount)

  let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.methods.items(i).call()
      console.log("marketplace item = ",item)

    if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.methods.tokenURI(item.tokenId).call()
        // use uri to fetch the nft metadata stored on ipfs
       let uriTwo = "https://cors-anywhere.herokuapp.com/" + uri


        const response = await fetch(uriTwo, {model: "cors" })
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.methods.getTotalPrice(item.itemId).call()    //.send( { gas: 300000, from: account }); 
        console.log("totalPrice = >", totalPrice)
        console.log("totalPrice ->", totalPrice.toString())
        //await setTotalPriceTwo(item.itemId)        
        //const totalPriceTwo = await marketplace.methods.getTotalPriceTwo()
        //console.log("totalPriceTow ==*>" , totalPriceTwo) 

	    // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
        console.log("metadata.image =**=>", metadata.image)
        console.log("metadata.name  =**=>", metadata.name)
        console.log("metadata.totalPrice =**=> ", metadata.totalPrice)    


    }
    }
    setLoading(false)
    setItems(items)
  }

 const buyMarketItem = async (item, account) => {
  

  //  await (await marketplace.methods.purchaseItem(item.itemId, { value: item.totalPrice })).wait()    
//  await (await marketplace.methods.purchaseItem(item.itemId)).wait()
       const tPrice = await marketplace.methods.getTotalPrice(item.itemId).call()
 
       console.log("tPrice = = =>", tPrice)


	 await marketplace.methods.purchaseItem(item.itemId).send({gas: 3000000, from : account, value: tPrice });


//	    await marketplace.methods.purchaseItem(item.itemId).send({gas: 3000000, from : account ,value: marketplace.methods.getTotalPrice(item.itemId )} );



    loadMarketplaceItems()
  }



  useEffect(() => {
     console.log("useEffect: load in the loadMarketplace")
     // wait for 1 second before trying this!!!
// set up a render flag in the routine which is not getting loaded 
	  // in time!!!!
//	  loadMarketplaceItems() 
 
//  setTimeout(function() { //Start the timer
    //  this.setState({render: true}) //After 1 second, set render to true
    loadMarketplaceItems()
 


  //}.bind(this), 10000)


  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
      {items.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
            <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body color="s
econdary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                        <Button onClick={() => buyMarketItem(item, account2  )} variant="primary" size="lg"> 
		    purchase the item!
		    Buy for TH

		    </Button>
		    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}
   </div>
  );
}
export default Home

