package servlet;

import static br.com.caelum.vraptor.view.Results.json;

import java.util.List;

import model.Cliente;
import br.com.caelum.vraptor.Consumes;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.Validator;
import br.com.caelum.vraptor.view.Results;
import dao.ClienteDAO;

@Resource
public class ClientesController {
	private ClienteDAO dao;
	Validator validator;
	private Result result;
	
	public ClientesController(Result result, Validator validator, ClienteDAO dao) {
		this.result = result;
		this.validator = validator;
        this.dao = dao;
	}
	
	public void lista() {
		List lista = dao.getLista();  
		result.use(json()).from(lista).recursive().serialize();
	}
	
	public void listajson() {
		List lista = dao.getLista();
//		result.use(json()).from(lista.get(0)).serialize();
		result.use(Results.json()).withoutRoot().from(lista).serialize();
//		customJSONSerialization.withoutRoot().
	}
	
	public void obter() {
		List<Cliente> lista = dao.getLista();
//		result.use(json()).from(lista.get(0)).serialize();
		result.use(Results.json()).withoutRoot().from(lista.get(0)).serialize();
//		customJSONSerialization.withoutRoot().
	}

	@Post
	@Consumes("application/json")
	public void salvar(Cliente cliente) {
		dao.salvar(cliente);
	}
	
}
