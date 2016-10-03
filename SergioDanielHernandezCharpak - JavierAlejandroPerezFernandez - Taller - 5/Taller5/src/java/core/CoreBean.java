/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package core;

import javax.inject.Named;
import javax.enterprise.context.Dependent;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

/**
 *
 * @author javier
 */
//@Named(value = "coreBean")
//@Dependent
@ManagedBean
@SessionScoped
public class CoreBean {

    // VARIABLES LOCALES
    private static final long serialVersionUID = 1L;
	
    private String name;
    
    // CONSTRUCTOR
   // public CoreBean() {
    //}
    
    
    // METODOS
    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    public String getLists(){
        if("".equals(name) || name ==null){
            return "";
	}else{
            return "The lists:" + name;
	}
    }
}
