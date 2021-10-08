import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'

const FormularioCadastro = (props) => {

    // Variaveis de captura de dados
    const camposIniciaisDeValores = {
        nomeCompleto: '',
        email: '',
        celular: '',
        dataNascimento: '',
        endereco: ''
    }

    let [values, setValues] = useState(camposIniciaisDeValores)

    useEffect(() => {
        if (props.idAtual == '') {
            setValues({
                ...camposIniciaisDeValores
            })
        } else {
            setValues({
                ...props.dadosPacientes[props.idAtual]
            })
        }
    }, [props.idAtual, props.dadosPacientes])

    const manipuladorInputChange = e => {
        let { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        })
    }

    const manipuladorFormEnvio = e => {
        e.preventDefault()
        props.addEdit(values)
    }

    return (
        <form autoComplete="off" onSubmit={manipuladorFormEnvio}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>

                <input className="form-control" placeholder="Nome completo" name="nomeCompleto" value={values.nomeCompleto} onChange={manipuladorInputChange} />
            </div>

            <div className="row">
                <div className="form-group input-group col-md-12">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>

                    <input className="form-control" placeholder="E-mail" name="email" value={values.email} onChange={manipuladorInputChange} />
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-mobile"></i>
                        </div>
                    </div>

                    <input className="form-control" placeholder="Celular" name="celular" value={values.celular} onChange={manipuladorInputChange} />
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-table"></i>
                        </div>
                    </div>

                    <input className="form-control" placeholder="Data de nascimento" name="dataNascimento" value={values.dataNascimento} onChange={manipuladorInputChange} />
                </div>

                <div className="form-group input-group col-md-12">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                    </div>

                    <textarea className="form-control" placeholder="Endereço" name="endereco" value={values.endereco} onChange={manipuladorInputChange} />
                </div>
            </div>

            <div className="form-group">
                <input type="submit" value={props.idAtual == '' ? 'Salvar' : 'Atualizar'} className="btn btn-primary btn-block" />
            </div>
        </form>
    )
}

export default FormularioCadastro