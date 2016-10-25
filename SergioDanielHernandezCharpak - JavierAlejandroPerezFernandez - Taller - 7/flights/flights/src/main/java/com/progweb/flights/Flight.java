package com.progweb.flights;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Flight{
    
    private static final long serialVersionUID = 1L;
    private long id;
    private String name;
    private Date hour;
    private String state;
    
    public Flight(){
    	
    }
    
    public Flight(long id, String name, Date hour, String state){
    	this.id = id;
    	this.name = name;
    	this.hour = hour;
    	this.state = state;
    }

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getHour() {
		return hour;
	}

	public void setHour(Date hour) {
		this.hour = hour;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    
    
}
