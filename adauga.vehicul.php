<?php include __DIR__ . '/inc/header.php' ?>

<?php
require __DIR__ . '/inc/conn.php';



if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST) && count($_POST) > 0) {

    $checkIfExisting = $_POST['nr_inmatriculare'];
    $stmtCheck = $pdo->prepare('SELECT COUNT(*) FROM `vehicule` WHERE `nr_inmatriculare` = :numar_inmatriculare');
    $stmtCheck->bindValue('numar_inmatriculare', $checkIfExisting);
    $stmtCheck->execute();
    $count = $stmtCheck->fetchColumn();

    if ($count > 0) {
        echo "<div class='masina-existenta'><h2>Masina exista in baza de date.</h2></div>";
        echo "<div class='masina-existenta'><h2>Pagina se reincarca in 5 secunde...</h2></div>";
        header('Refresh: 5; url=adauga.vehicul.php');
    } else {


        $stmt = $pdo->prepare('INSERT INTO `vehicule`(`display`, `nr_inmatriculare`, `marca_masina`, `serie_sasiu`, `sursa`, `cilindree`, `serie_motor`, `categoria`, `data_achizitiei`, `consum_normat`, `departament`, `utilizator`, `status`, `tractiune`) VALUES (:display , :nr_inmatriculare, :marca_masina, :serie_sasiu, :sursa, :cilindree, :serie_motor, :categoria, :data_achizitiei, :consum_normat, :departament, :utilizator, :statuss, :tractiune)');

        $stmt->bindValue('display', strtoupper($_POST['display']));
        $stmt->bindValue('nr_inmatriculare', strtoupper($_POST['nr_inmatriculare']));
        $stmt->bindValue('marca_masina', ucwords($_POST['marca_masina']));
        $stmt->bindValue('serie_sasiu', strtoupper($_POST['serie_sasiu']));
        $stmt->bindValue('sursa', $_POST['sursa']);
        $stmt->bindValue('cilindree', $_POST['cilindree']);
        $stmt->bindValue('serie_motor', $_POST['serie_motor']);
        $stmt->bindValue('categoria', ucwords($_POST['categoria']));
        $stmt->bindValue('data_achizitiei', $_POST['data_achizitiei']);
        $stmt->bindValue('consum_normat', $_POST['consum_normat']);
        $stmt->bindValue('departament', ucfirst($_POST['departament']));
        $stmt->bindValue('utilizator', ucwords($_POST['utilizator']));
        $stmt->bindValue('statuss', ucwords($_POST['status']));
        $stmt->bindValue('tractiune', ucfirst($_POST['tractiune']));


        $stmt->execute();

        header('Location: index.php');
    }
}


?>

<?php if (count($_POST) === 0): ?>
    <div class="header">
        <h3>Adăugare Vehicul</h3>
    </div>

    <div class="forma-adaugare">
        <div class="forma">

            <form method="POST">
                <div class="option">
                    <label for="display">Display<span style="color:red;">*</span></label>
                    <input type="text" name="display" id="" placeholder="Display ex. B 155 TCH" required>
                    <label for="nr_inmatriculare">Număr înmatriculare<span style="color:red;">*</span></label>
                    <input type="text" name="nr_inmatriculare" id="" placeholder="Numar inmatriculare ex. B155TCH" required>
                    <label for="marca_masina">Marcă mașină<span style="color:red;">*</span></label>
                    <input type="text" name="marca_masina" id="" placeholder="Marca masinii" required>
                    <label for="serie_sasiu">Seria șasiului<span style="color:red;">*</span></label>
                    <input type="text" name="serie_sasiu" id="" placeholder="Serie sasiu" required>
                    <label for="sursa">Sursa</label>
                    <select name="sursa" class="select">
                        <option value="Benzina">Benzină</option>
                        <option value="Motorina">Motorină</option>
                        <option value="Electrica">Electrică</option>
                        <option value="Electrica">Benzină + Electrică</option>
                    </select>
                    <label for="cilindree">Cilindree<span style="color:red;">*</span></label>
                    <input type="text" name="cilindree" id="" placeholder="Cilindree" required>
                    <label for="serie_motor">Serie motor<span style="color:red;">*</span></label>
                    <input type="text" name="serie_motor" id="" placeholder="Serie motor" required>

                    <label for="categoria">Selectează Categoria</label>
                    <select name="categoria" class="select">
                        <option value="Autoturism M1">Autoturism M1</option>
                        <option value="Autoturism M1G">Autoturism M1G</option>
                        <option value="Autoutilitara N1">Autoutilitara N1</option>
                    </select>

                    <label for="tractiune">Selectează Tracțiunea</label>
                    <select name="tractiune" class="select">
                        <option value="Fata" id="">Fata</option>
                        <option value="Integrala" id="">Integrala</option>
                        <option value="Spate" id="">Spate</option>
                    </select>

                    <label for="data_achizitiei">Data achiziției<span style="color:red;">*</span></label>
                    <input type="date" name="data_achizitiei" id="" placeholder="Data achizitiei" required>
                    <label for="consum_normat">Consum normat l/100km<span style="color:red;">*</span></label>
                    <input type="text" name="consum_normat" id="" placeholder="Consum normat" required>

                    <label for="departament">Selectează Departament</label>
                    <select name="departament" class="select">
                        <option value="Administrativ">Administrativ</option>
                        <option value="Cafenele">Cafenele</option>
                        <option value="Financiar">Financiar</option>
                        <option value="Logistica">Logistică</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Prajitorie">Prăjitorie</option>
                        <option value="Service">Service</option>
                        <option value="Vanzari">Vânzări</option>
                    </select>

                    <label for="utilizator">Nume Utilizator<span style="color:red;">*</span></label>
                    <input type="text" name="utilizator" id="" placeholder="Utilizator" required>
                    <label for="status">Status Mașină</label>
                    <select name="status" class="select">
                        <option value="Activa">Activă</option>
                        <option value="Vanduta">Vândută</option>
                    </select>
                    <p>Câmpurile marcate cu <span style="color:red;">*</span> sunt obligatorii</p>
                </div>
                <button type="submit" value="submit">Adaugă</button>
            </form>

            <button><a href="index.php">Înapoi la pagina de start</a></button>

        </div>
    <?php endif; ?>
    </div>
    <?php include __DIR__ . "/inc/footer.php" ?>