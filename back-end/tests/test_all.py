import subprocess
from importlib import import_module
import inspect

def run_tests():
    # Lista de archivos de tests a ejecutar
    test_files = ["tests.critics.test_critics", "tests.games.test_games","tests.score_weights.test_score_weights",
                  "tests.user_games.test_user_games", "tests.users.test_users", "tests.wishlist.test_wishlist"]

    for test_file in test_files:
        # Importar el módulo que contiene los tests
        test_module = import_module(test_file)

        # Obtener todos los nombres de los tests definidos en el módulo
        test_names = [name for name, _ in inspect.getmembers(test_module, inspect.isfunction) if name.startswith("test_")]

        # Ejecutar solo los tests definidos en el módulo
        for test_name in test_names:
            result = subprocess.run(["pytest", "-v", "--tb=native", f"{test_file.replace('.', '/')}.py::{test_name}"], capture_output=True)
            if result.returncode != 0:
                print(f"¡Atención! El test {test_name} en {test_file} ha fallado.")
                print(result.stdout.decode('latin-1'))
                exit(1)
            else:
                print(f"El test {test_name} en {test_file} ha pasado correctamente.")

if __name__ == "__main__":
    # Ejecutar los tests al inicio
    run_tests()

    # Si todos los tests pasan, iniciar la aplicación
    print("Iniciando la aplicación...")
    # Aquí debes poner el código para iniciar tu aplicación
