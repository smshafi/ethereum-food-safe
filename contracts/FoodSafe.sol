pragma solidity ^0.4.11;
contract FoodSafe 
{ 
    struct Location 
    {    
        string name;  
        uint locationID;   
        uint previousLocationID;   
        string secret;    
        uint timestamp;
    } 
    mapping (uint => Location) Trail;
    uint trailcount=0;
    function addNewLocation(string name,uint locationID,string secret)
    {    
        Location memory newLocation;    
        newLocation.name=name;    
        newLocation.locationID=locationID;    
        if (trailcount>0)    
        {        
            newLocation.previousLocationID=Trail[trailcount-1].locationID;    
        
        }    
        newLocation.secret=secret;    
        newLocation.timestamp=now;    
        Trail[trailcount]=newLocation;    
        trailcount=trailcount+1;
            
    } 
    function GetTrailCount() returns (uint) 
    { 
        return trailcount;
    }
    function GetLocation(uint trailNo) returns (string,uint,uint,uint,string)
    {    
        return (Trail[trailNo].name,Trail[trailNo].locationID,Trail[trailNo].previousLocationID,Trail[trailNo].timestamp,Trail[trailNo].secret);
        
    }
    
}
