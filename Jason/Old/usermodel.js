//revision  A
//Date:     1/2/2013
//Time:     12:15


Ext.define('User', {
    extend: 'Ext.data.Model',

    config: {
        fields: ['username', 'password', 'secQ', 'secA', 'pass_expiry'],

        validations: [
            { type: 'presence',  field: 'username' },
            { type: 'length',    field: 'username', min: 5 },
            { type: 'format',    field: 'age', matcher: /\d+/ }, //means it should be a number
            { type: 'inclusion', field: 'gender', list: ['male', 'female'] },
            { type: 'exclusion', field: 'name', list: ['admin'] }
        ],

        proxy: {
            type: 'rest',
            url : './Jason/users',
            reader: {
                type: 'json',
                root: 'users'
            }
        }
    }
});

// now lets try to create a new user with as many validation errors as we can
var newUser = Ext.create('User', {
    username: 'admin',
    password: 'twenty-nine',
    pass_expiry: '17/2/2013'
});

// run some validation on the new user we just created
var errors = newUser.validate();

console.log('Is User valid?', errors.isValid()); // returns 'false' as there were validation errors
console.log('All Errors:', errors.items); // returns the array of all errors found on this model instance

console.log('Password Errors:', errors.getByField('password')); // returns the errors for the password field