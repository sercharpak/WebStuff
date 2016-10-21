package com.progweb.flights;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class FlightService {

	private final String ON_TIME = "ON TIME";
	private final String DELAYED = "DELAYED";
	private final String TO_LAND = "TO_LAND";
	private final String TO_BOARD = "TO BOARD";
	private final String TO_TAKE_OFF = "TO TAKE OFF";
	
	private Map<Long, Flight> flights = DatabaseClass.getFlights();
	
	public FlightService(){
		flights.put(1L, new Flight(1,"BOG-BGA",new Date(),ON_TIME));
		flights.put(2L, new Flight(2,"BGA-BOG",new Date(),DELAYED));
		flights.put(3L, new Flight(3,"BGA-BOG",new Date(),TO_LAND));
		flights.put(4L, new Flight(4,"BGA-BOG",new Date(),TO_BOARD));
	}
	
	
	public List<Flight> getAllFlights() {       
        return new ArrayList<Flight>(flights.values());
    }
	
	public Flight getFlight(long id){
		return flights.get(id);
	}
	
	public Flight addFlight(Flight flight){
		flight.setId(flights.size()+1);
		flights.put(flight.getId(), flight);
		return flight;
	}
	
	public Flight updateFlight(Flight flight){
		if(flight.getId() <= 0){
			return null;
		}
		flights.put(flight.getId(), flight);
		return flight;
	}
	
	public Flight removeFlight(long id){
		return flights.remove(id);
	}
}
