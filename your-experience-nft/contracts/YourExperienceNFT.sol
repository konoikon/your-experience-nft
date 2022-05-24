// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import {Base64} from "../libraries/Base64.sol";

contract YourExperienceNFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721("Your Experience NFT", "YE") {}

  function mintNFT(
    string memory _name,
    string memory _description,
    string memory _image
  ) public {
    uint256 newItemId = _tokenIds.current();

    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "My ',
            _name,
            ' experience", "description": "This NFT testifies my experience at ',
            _name,
            ". ",
            _description,
            '", "image": "',
            _image,
            '"}'
          )
        )
      )
    );

    string memory finalTokenUri = string(
      abi.encodePacked("data:application/json;base64,", json)
    );

    _safeMint(msg.sender, newItemId);

    _setTokenURI(newItemId, finalTokenUri);

    _tokenIds.increment();
  }
}
