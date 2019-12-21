pragma solidity >=0.4.21 <0.6.0;

contract PhotoContract {
    
    struct Photo {
        string road_id;
        string person_id;
        uint latitude;
        uint longitude;
        string ipfs_hash;
        uint photo_type;
        uint complaint_status;
    }
    
    mapping(string => Photo) private photos;
    
    uint256 public photosCount;
    uint256 public complaintsCount;
    
    constructor() public {
        
    }
    
    function addNewPhoto(string memory _rId, string memory _pId, uint _lat, uint _long, string memory _ipfsHash, uint8 _type, uint8 _status) public{
        photosCount++;
        string memory id = strConcat(_rId, _pId);
        photos[id].road_id = _rId;
        photos[id].person_id = _pId;
        photos[id].latitude = _lat;
        photos[id].longitude = _long;
        photos[id].ipfs_hash = _ipfsHash;
        photos[id].photo_type = _type;
        photos[id].complaint_status = _status;
    }
    
    function retrievePhoto(string memory _rId, string memory _pId) public view returns (uint, uint, string, uint, uint){
        string memory id = strConcat(_rId, _pId);
        return (photos[id].latitude, photos[id].longitude, photos[id].ipfs_hash, photos[id].photo_type, photos[id].complaint_status);
    }
    
    function changeStatus(string memory _rId, string memory _pId, uint8 _status) public {
        string memory id = strConcat(_rId, _pId);
        // already processed complaint
        if(photos[id].complaint_status == 3 || photos[id].complaint_status == 4){
            return;
        }
        if(_status == 3 || _status == 4){
            complaintsCount--;
        }
        photos[id].complaint_status = _status;
    }
    
    function strConcat(string memory _a, string memory _b) internal pure returns (string memory){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        string memory ab = new string(_ba.length + _bb.length);
        bytes memory bab = bytes(ab);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) bab[k++] = _ba[i];
        for ( i = 0; i < _bb.length; i++) bab[k++] = _bb[i];
        return string(bab);
    }
}
