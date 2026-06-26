'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create users table
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create plans table
    await queryInterface.createTable('plans', {
      id: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create customers table
    await queryInterface.createTable('customers', {
      id: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      status: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    });

    // Create subscriptions table
    await queryInterface.createTable('subscriptions', {
      id: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      customerId: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      planId: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
          model: 'plans',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });

    // Create addresses table
    await queryInterface.createTable('adresses', {
      id: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false,
      },
      customerId: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id',
        },
      },
      street: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      number: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      neighborhood: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      complement: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    });

    // Create emails table
    await queryInterface.createTable('emails', {
      id: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false,
      },
      customerId: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id',
        },
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
    });

    // Create installment table
    await queryInterface.createTable('installment', {
      id: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false,
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      subscriptionId: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
          model: 'subscriptions',
          key: 'id',
        },
      },
      paidAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Create payments table
    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false,
      },
      installmentId: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
          model: 'installment',
          key: 'id',
        },
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      paidDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Create phones table
    await queryInterface.createTable('phones', {
      id: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false,
      },
      customerId: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id',
        },
      },
      phone: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    });

    // Create indexes for foreign keys
    await queryInterface.addIndex('subscriptions', ['customerId'], { name: 'subscriptions_customers_FK' });
    await queryInterface.addIndex('subscriptions', ['planId'], { name: 'subscriptions_plans_FK' });
    await queryInterface.addIndex('adresses', ['customerId'], { name: 'adresses_customers_FK' });
    await queryInterface.addIndex('emails', ['customerId'], { name: 'emails_customers_FK' });
    await queryInterface.addIndex('installment', ['subscriptionId'], { name: 'installment_subscriptions_FK' });
    await queryInterface.addIndex('payments', ['installmentId'], { name: 'payments_installment_FK' });
    await queryInterface.addIndex('phones', ['customerId'], { name: 'phones_customers_FK' });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order (due to foreign key constraints)
    await queryInterface.dropTable('payments', { force: true });
    await queryInterface.dropTable('installment', { force: true });
    await queryInterface.dropTable('subscriptions', { force: true });
    await queryInterface.dropTable('phones', { force: true });
    await queryInterface.dropTable('emails', { force: true });
    await queryInterface.dropTable('adresses', { force: true });
    await queryInterface.dropTable('customers', { force: true });
    await queryInterface.dropTable('plans', { force: true });
    await queryInterface.dropTable('users', { force: true });
  },
};
