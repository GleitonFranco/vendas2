package dao;

import javax.annotation.PreDestroy;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import org.hibernate.Session;

import br.com.caelum.vraptor.ioc.ApplicationScoped;
import br.com.caelum.vraptor.ioc.Component;
import br.com.caelum.vraptor.ioc.ComponentFactory;

@ApplicationScoped
@Component
public class EntityManagerCreator implements ComponentFactory<EntityManager> {
	private static final String PERSISTENCE_UNIT_NAME = "vendas2";
	private static ThreadLocal<EntityManager> manager = new ThreadLocal<EntityManager>();
	private static EntityManagerFactory factory;

	public static boolean isEntityManagerOpen(){
		return EntityManagerCreator.manager.get() != null && EntityManagerCreator.manager.get().isOpen();
	}
	
	public static void evictCache(EntityManager em, String region){
		((Session)em.getDelegate()).getSessionFactory().getCache().evictQueryRegion(region);
	}

	public static void closeEntityManager() {
		EntityManager em = EntityManagerCreator.manager.get();
		if (em != null) {
			EntityTransaction tx = em.getTransaction();
			if (tx.isActive()) { 
				tx.commit();
			}
			em.close();
			EntityManagerCreator.manager.set(null);
		}
	}
	
	@PreDestroy
	public static void closeEntityManagerFactory(){
		closeEntityManager();
		EntityManagerCreator.factory.close();
	}

	@Override
	public EntityManager getInstance() {
		if (EntityManagerCreator.factory == null) {
			EntityManagerCreator.factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
		}
		EntityManager em = EntityManagerCreator.manager.get();
		if (em == null || !em.isOpen()) {
			em = EntityManagerCreator.factory.createEntityManager();
			EntityManagerCreator.manager.set(em);
		}
		return em;
	}
	
}
//HSQL SERVER
//mvn exec:java -Dexec.mainClass="org.hsqldb.Server" -Dexec.args="-database.0 file:target/data/vendas2"
//HSQL GUI
//mvn exec:java -Dexec.mainClass="org.hsqldb.util.DatabaseManagerSwing" -Dexec.args="--url jdbc:hsqldb:hsql://localhost"
