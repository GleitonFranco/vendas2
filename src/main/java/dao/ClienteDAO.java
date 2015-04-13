package dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import model.Cliente;
import br.com.caelum.vraptor.ioc.Component;

@Component
public class ClienteDAO {
	List<Cliente> clientes;
	EntityManagerCreator entityManagerCreator;
	
	public ClienteDAO(EntityManagerCreator entityManagerCreator) {
		this.entityManagerCreator = entityManagerCreator;
		this.clientes = new ArrayList<>();
		Cliente c1 = new Cliente();
		c1.setId(1);
		c1.setNome("Gleiton Soares Franco");
		c1.setFone("8714-7399");
		clientes.add(c1);
		Cliente c2 = new Cliente();
		c2.setId(1);
		c2.setNome("Margarida Soares Franco");
		c2.setFone("8922-3472");
		clientes.add(c2);
	}
	
	public List<Cliente> getLista() {
		return clientes;
	}
	
	public Cliente getById(Integer id) {
		Cliente result = null;
		for(Cliente c : clientes) {
			if (c.getId().equals(id)) result = c;
		}
		return result;
	}

	public void salvar(Cliente cliente) {
		EntityManager em = entityManagerCreator.getInstance();
		em.getTransaction().begin();
		em.persist(cliente);		
		em.flush();
		em.getTransaction().commit();
	}
}
