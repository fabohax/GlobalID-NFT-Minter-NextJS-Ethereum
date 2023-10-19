const OpenSea = require('opensea-js');

async function minter(name, lastName, dateOfBirth, country, passport, email, pic, social, site) {
  // Create a new OpenSea client.
  const client = new OpenSea();

  // Get the account address of the user who is minting the NFT.
  const accountAddress = client.getAccountId();

  // Create a new NFT asset.
  const asset = {
    name,
    lastName,
    dateOfBirth,
    country,
    passport,
    email,
    pic,
    social,
    site
  };

  // Mint the NFT.
  const txId = await client.mintNFT(asset);

  // Wait for the transaction to be confirmed.
  await client.waitForTransactionConfirmation(txId);

  // Return the NFT asset.
  return asset;
}
