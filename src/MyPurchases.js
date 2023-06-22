import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'

//export default function MyPurchases({ marketplace, nft, account }) {
const MyPurchases = ({ marketplace, nft, account }) => {

const [loading, setLoading] = useState(true)
  const [purchases, setPurchases] = useState([])
  const loadMarketplaceItems = async () => {
    // Load all unsold items
  console.log("within the Home module")
  const itemCount = await marketplace.methods.itemCount().call()
  console.log("itemCount = ", itemCount)

  let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.methods.items(i).call()
      console.log("marketplace item = ",item)

    if (item.sold) {
        const uri = await nft.methods.tokenURI(item.tokenId).call()
        // use uri to fetch the nft metadata stored on ipfs
       let uriTwo = "https://cors-anywhere.herokuapp.com/" + uri


        const response = await fetch(uriTwo, {model: "cors" })
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.methods.getTotalPrice(item.itemId).call()
        console.log("totalPrice = >", totalPrice)
        console.log("totalPrice ->", totalPrice.toString())

        // Add item to items array
        purchases.push({
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
    //setItems(items)
  }

//    const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
//    const filter =  marketplace.filters.Bought(null,null,null,null,null,account)
//    const results = await marketplace.methods.queryFilter(filter)
    //Fetch metadata of each nft and add that to listedItem object.
//    const purchases = await Promise.all(results.map(async i => {
      // fetch arguments from each result
//      i = i.args
      // get uri url from nft contract
//      const uri = await nft.tokenURI(i.tokenId)
      // use uri to fetch the nft metadata stored on ipfs 
//      const response = await fetch(uri)
//      const metadata = await response.json()
      // get total price of item (item price + fee)
//      const totalPrice = await marketplace.getTotalPrice(i.itemId).call()
      // define listed item object
//      let purchasedItem = {
//        totalPrice,
//        price: i.price,
//        itemId: i.itemId,
//        name: metadata.name,
//        description: metadata.description,
//        image: metadata.image
// /     }
//      return purchasedItem
//    }))
//    setLoading(false)
//    setPurchases(purchases)
//  }
  useEffect(() => {
    console.log("useEffect: load in the loadMarketplace")
    loadMarketplaceItems() 
    // loadPurchasedItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
      {purchases.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {purchases.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Footer>{ethers.utils.formatEther(item.totalPrice)} ETH</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No purchases</h2>
          </main>
        )}
    </div>
  );
}
export default MyPurchases
