<?php
namespace Nibiru;
/**
 * User       - stephan
 * Date       - 01.02.17
 * Time       - 17:36
 * @author    - alllinux.de GbR
 * @category  - [PLEASE SPECIFIY]
 * @license   - BSD License
 */
class Mysql implements IMysql
{
	use Messages;

	private static $_instance;

	protected $_dsn            = self::PLACE_DSN;
	protected $_username       = self::PLACE_USERNAME;
	protected $_password       = self::PLACE_PASSWORD;
	protected $_diver          = self::PLACE_DRIVER;
	protected $_hostname       = self::PLACE_HOSTNAME;
	protected $_dbname         = self::PLACE_DATABASE;
	protected $_port           = self::PLACE_PORT;

	protected $_conn           = self::PLACE_CONNECTION;

	protected function __construct( $section = false )
	{
        if($section)
        {
            $settings = Config::getInstance()->getConfig()[$section];
        }
        else
        {
            $settings = Config::getInstance()->getConfig()[self::SETTINGS_DATABASE];
        }
		$this->_setUsername($settings[self::PLACE_USERNAME]);
		$this->_setPassword($settings[self::PLACE_PASSWORD]);
		$this->_setDbname($settings[self::PLACE_DATABASE]);
		$this->_setDiver($settings[self::PLACE_DRIVER]);
		$this->_setHostname($settings[self::PLACE_HOSTNAME]);
		$this->_setPort($settings[self::PLACE_PORT]);
		$this->_setDsn();
		$this->_setConn();
	}

	public static function getInstance( $section = false )
	{
		$className = get_called_class();
		if(self::$_instance==null) self::$_instance = new $className( $section );
		return self::$_instance;
	}

	/**
	 * @return string
	 */
	protected function getDsn()
	{
		return $this->_dsn;
	}

	/**
	 * @param string $dsn
	 */
	private function _setDsn( )
	{
		$this->_dsn = $this->getDiver() . ':host=' . $this->getHostname() . ';port=' . $this->getPort() . ';dbname=' .  $this->getDbname();
	}

	/**
	 * @return string
	 */
	protected function getUsername()
	{
		return $this->_username;
	}

	/**
	 * @param string $username
	 */
	private function _setUsername( $username )
	{
		$this->_username = $username;
	}

	/**
	 * @return string
	 */
	protected function getPassword()
	{
		return $this->_password;
	}

	/**
	 * @param string $password
	 */
	private function _setPassword( $password )
	{
		$this->_password = $password;
	}

	/**
	 * @return mixed
	 */
	protected function getDiver()
	{
		return $this->_diver;
	}

	/**
	 * @param mixed $diver
	 */
	private function _setDiver( $diver )
	{
		$this->_diver = $diver;
	}

	/**
	 * @return string
	 */
	protected function getHostname()
	{
		return $this->_hostname;
	}

	/**
	 * @param string $hostname
	 */
	private function _setHostname( $hostname )
	{
		$this->_hostname = $hostname;
	}

	/**
	 * @return string
	 */
	protected function getDbname()
	{
		return $this->_dbname;
	}

	/**
	 * @param string $dbname
	 */
	private function _setDbname( $dbname )
	{
		$this->_dbname = $dbname;
	}

	/**
	 * @return string
	 */
	protected function getConn()
	{
		return $this->_conn;
	}

	/**
	 * @param string $conn
	 */
	private function _setConn( )
	{
		$this->_conn = new \PDO($this->getDsn(), $this->getUsername(), $this->getPassword());
	}

	/**
	 * @return string
	 */
	protected function getPort()
	{
		return $this->_port;
	}

	/**
	 * @param string $port
	 */
	private function _setPort( $port )
	{
		$this->_port = $port;
	}

}