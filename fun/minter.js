const OpenSea = require('opensea-js');

async function mint(NAME, LAST_NAME, DATE_OF_BIRTH, COUNTRY, PASSPORT, EMAIL, PICTURE, SOCIAL, SITE) {
  // Create a new OpenSea client.
  const client = new OpenSea();

  // Get the account address of the user who is minting the NFT.
  const accountAddress = client.getAccountId();

  // Create a new NFT asset.
  const asset = {
    NAME,
    LAST_NAME,
    DATE_OF_BIRTH,
    COUNTRY,
    PASSPORT,
    EMAIL,
    PICTURE,
    SOCIAL,
    SITE
  };

  // Mint the NFT.
  const txId = await client.mint(asset);

  // Wait for the transaction to be confirmed.
  await client.waitForTransactionConfirmation(txId);

  // Return the NFT asset.
  return asset;
}
