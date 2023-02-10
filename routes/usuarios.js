

const { Router } = require('express');
const { check } = require('express-validator');

const { esRoleValido, emailExiste, existeUsuarioporId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar_campos');


const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');
const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioporId),
    check('rol').custom(esRoleValido),
    validarCampos

], usuariosPut);


router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y más de 6 letras').isLength(6),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);


router.delete('/:id', [
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioporId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);








module.exports = router;