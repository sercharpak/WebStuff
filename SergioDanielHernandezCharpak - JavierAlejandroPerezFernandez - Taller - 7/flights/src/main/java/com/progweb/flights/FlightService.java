package com.progweb.flights;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class FlightService {
	
	private final String ON_TIME = "ON TIME";
	private final String DELAYED = "DELAYED";
	private final String TO_LAND = "TO LAND";
	private final String TO_BOARD = "TO BOARD";
	private final String TO_TAKE_OFF = "TO TAKE OFF";
	
	private Map<Long, Flight> flights = DatabaseClass.getFlights();
	
	public FlightService(){
		Date f1 = new Date(116,10,10,15,03,0);
		flights.put(1L, new Flight(1,"AV 9734 : Bogotá to Bucaramanga",f1,ON_TIME));		
		Date f2 = new Date(116,11,04,07,35,0);
		flights.put(2L, new Flight(2,"FC 8151 : Bogotá to Cali",f2,DELAYED));		
		Date f3 = new Date(116,9,24,21,15,0);
		flights.put(3L, new Flight(3,"FC 8025 : Cartagena to Miami",f3,TO_LAND));		
		Date f4 = new Date(116,9,31,11,45,0);
		flights.put(4L, new Flight(4,"LA 3060 : Cali to Medellin",f4,TO_BOARD));		
		Date f5 = new Date(116,11,19,13,05,0);
		flights.put(5L, new Flight(5,"LA 3139 : Barranquilla to Cancún",f5,TO_TAKE_OFF));
	}
	
	
	public List<Flight> getAllFlights() {       
        return new ArrayList<Flight>(flights.values());
    }
	
	public Flight getFlight(long key){
		return flights.get(key);
	}
	
	public Flight addFlight(Flight flight){
		flight.setKey(flights.size()+1);
		flights.put(flight.getKey(), flight);
		return flight;
	}
	
	public Flight updateFlight(Flight flight){
		if(flight.getKey() <= 0){
			return null;
		}
		flights.put(flight.getKey(), flight);
		return flight;
	}
	
	public Flight removeFlight(long key){
		return flights.remove(key);
	}
}
