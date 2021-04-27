USE Vh2rq8PjFR;

DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS role;
CREATE TABLE role (
  -- specific fields
  id          INT             NOT NULL    AUTO_INCREMENT,
  name        VARCHAR(100)    NOT NULL,
  permissions TEXT            NOT NULL,

  -- common fields
  is_active   BOOLEAN         NOT NULL    DEFAULT true,
  is_deleted  BOOLEAN         NOT NULL    DEFAULT false,
  created_on  TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  created_by  INT             NOT NULL,
  modified_on TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  modified_by INT             NOT NULL,

  -- keys
  PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `user` (
  id              INT             NOT NULL    AUTO_INCREMENT,
  role_id         INT             NOT NULL,
  name            VARCHAR(100)    NOT NULL,
  email           VARCHAR(100)    NOT NULL,
  password        VARCHAR(150)    NOT NULL,
  is_verified     BOOLEAN         NOT NULL    DEFAULT false,
  use_darkmode    BOOLEAN         NOT NULL    DEFAULT false,

  -- common fields
  is_active   BOOLEAN         NOT NULL    DEFAULT true,
  is_deleted  BOOLEAN         NOT NULL    DEFAULT false,
  created_on  TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  created_by  INT             NOT NULL,
  modified_on TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  modified_by INT             NOT NULL,

  -- keys
  PRIMARY KEY (id),
  FOREIGN KEY (role_id)       REFERENCES role (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;


