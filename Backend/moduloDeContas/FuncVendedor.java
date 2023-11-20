package moduloDeContas;

public class FuncVendedor implements Usuário, Usuário {

	private String email;

	private String nome;

	private String senha;

	private TipoConta tipoConta;

	private TipoConta tipoConta;

	public abstract String getEmail();

	public abstract String getNome();

	public String getTipoConta() {
		return null;
	}

	public abstract boolean setEmail(String email);

	public abstract boolean setNome(String nome);

	public abstract boolean setSenha(String senha);


	/**
	 * @see moduloDeContas.Usuário#getSenha()
	 */
	public String getSenha() {
		return null;
	}

}
