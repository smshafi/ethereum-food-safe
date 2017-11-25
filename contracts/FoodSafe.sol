pragma solidity ^0.4.6;contract FoodSafe { struct Location {    string name;  uint locationID;   uint previousLocationID;   string secret;    uint timestamp;} mapping(uint=>Location) Trail;uint8 trailcount=0;function addNewLocation(string name,uint locationID,string secret){    Location memory newLocation;    newLocation.name=name;    newLocation.locationID=locationID;    if (trailcount!=0)    {        newLocation.previousLocationID=Trail[trailcount-1].locationID;    }    newLocation.secret=secret;    newLocation.timestamp=now;    Trail[trailcount]=newLocation;    trailcount++;} function GetTrailCount() returns(uint8)  {    return trailcount;} function GetLocation(uint8 trailNo) returns(string,uint,uint,uint,string){    return (Trail[trailNo].name,Trail[trailNo].locationID,Trail[trailNo].previousLocationID,Trail[trailNo].timestamp,Trail[trailNo].secret);}}