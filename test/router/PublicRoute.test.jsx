import { render, screen } from '@testing-library/react';
import { PublicRoute } from '../../src/router/PublicRoute';
import { AuthContext } from '../../src/auth';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Pruebas en <PublicRoute />', () => {
    
    
    test('si no esta autenticado debe de mostrar el children', () => {
        
        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta Publica</h1>
                </PublicRoute>
            </AuthContext.Provider> 
        )

        expect( screen.getByText('Ruta Publica') ).toBeTruthy()
        // screen.debug()

    })

    test('debe de navegar si esta autenticado', () => {
        
        const contextValue = {
            logged: true,
            user: {
                name: 'Leon',
                id: 'ABC123'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta Publica</h1>
                            </PublicRoute>
                        } />

                        <Route path='marvel' element={ <h1>Pagina marvel</h1> }/>
                    </Routes>
                    

                </MemoryRouter>
            </AuthContext.Provider> 
        );

        expect(screen.getByText('Pagina marvel')).toBeTruthy()

    })

});