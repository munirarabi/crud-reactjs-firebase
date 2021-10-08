import React, { useState, useEffect } from 'react'
import FormularioCadastro from './FormularioCadastro'
import fireDb from '../database/firebase'

const Cadastro = () => {

    let [dadosPacientes, setDadosPacientes] = useState({})

    let [idAtual, setIdAtual] = useState('')

    useEffect(() => {
        fireDb.child('pacientes').on('value', dbPhoto => {
            if (dbPhoto.val() != null) {
                setDadosPacientes({
                    ...dbPhoto.val()
                })
            } else {
                setDadosPacientes({})
            }
        })
    }, [])

    const addEdit = obj => {

        if (idAtual == '') {
            fireDb.child('pacientes').push(
                obj,
                error => {
                    if (error) {
                        console.log(error)
                    } else {
                        setIdAtual('')
                    }
                }
            )
        } else {
            fireDb.child(`pacientes/${idAtual}`).set(
                obj,
                err => {
                    if (err) {
                        console.log(err)
                    } else {
                        setIdAtual('')
                    }
                }
            )
        }
    }

    const deletePaciente = key => {
        if (window.confirm('Deseja realmente deletar esse cadastro')) {
            fireDb.child(`pacientes/${key}`).remove(
                err => {
                    if (err) {
                        console.log(err)
                    }
                }
            )
        }
    }

    return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Cadastro de paciente</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-5">
                    <FormularioCadastro {...({ addEdit, idAtual, dadosPacientes })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-boderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <td>Nome completo</td>
                                <td>Email</td>
                                <td>Celular</td>
                                <td>Data de nascimento</td>
                                <td>Endereço</td>
                                <td>Ações</td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                Object.keys(dadosPacientes).map(id => {
                                    return <tr key={id}>
                                        <td> {dadosPacientes[id].nomeCompleto} </td>
                                        <td> {dadosPacientes[id].email} </td>
                                        <td> {dadosPacientes[id].celular} </td>
                                        <td> {dadosPacientes[id].dataNascimento} </td>
                                        <td> {dadosPacientes[id].endereco} </td>

                                        <td>
                                            <a className="btn btn-primary" onClick={() => { setIdAtual(id) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>

                                            <a className="btn btn-danger" onClick={() => deletePaciente(id)}>
                                                <i className="fas fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Cadastro