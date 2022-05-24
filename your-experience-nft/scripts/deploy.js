const { ethers } = require("hardhat");

const DUMMY_NAME = "Sexy Fish Miami";
const DUMMY_DESCRIPTION = "I had the best time here!";
const DUMMY_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj4NCiAgICA8c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPg0KICAgIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPg0KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBjbGFzcz0iYmFzZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RXBpY0xvcmRIYW1idXJnZXI8L3RleHQ+DQo8L3N2Zz4=";

async function main() {
  const YourExperienceContract = await ethers.getContractFactory(
    "YourExperienceNFT"
  );
  const yourExperienceContract = await YourExperienceContract.deploy();
  await yourExperienceContract.deployed();

  console.log("Contract deployed at:", yourExperienceContract.address);

  const tx = await yourExperienceContract.mintNFT(
    DUMMY_NAME,
    DUMMY_DESCRIPTION,
    DUMMY_IMAGE
  );

  await tx.wait();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
