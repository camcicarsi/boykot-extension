# Uyarı Veren URL Eklentisi

Bu Chrome eklentisi, önceden tanımlanmış bir URL listesinde (boykotyap.com üzerinde yayınlanan firmaların internet siteleri) bulunan bir siteye girildiğinde kullanıcıya görsel bir uyarı gösterir. Eklenti, URL listesini dinamik olarak bir JSON dosyasından alabilir veya yerel depolama (local storage) üzerinden yönetilebilir. Kullanıcılar ayrıca ayarlar sayfası aracılığıyla engellenecek yeni URL'ler ekleyebilirler.

![Uyarı Görseli Örneği](https://boykotyap.com/images/hero/slogan.svg)
*Örnek bir uyarı görseli (eklentinin sitenin en üstünde gösterdiği gibi)*

## Özellikler

* **URL Tabanlı Uyarı:** Belirtilen URL'lere (alan adı ve protokol bazında) girildiğinde kullanıcıyı bilgilendirir.
* **Görsel Uyarı:** Sayfanın en üstünde dikkat çekici bir görsel göstererek uyarıyı daha belirgin hale getirir.
* **JSON URL Desteği (Opsiyonel):** URL listesi dinamik olarak belirtilen bir JSON dosyasından alınabilir. Bu, listenin merkezi olarak yönetilmesini sağlar.
* **Yerel Depolama Yönetimi:** Kullanıcılar, eklenti ayarları üzerinden doğrudan engellenecek URL'ler ekleyebilir ve silebilirler. Bu liste tarayıcının yerel depolamasında saklanır.
* **Varsayılan URL Listesi:** Eklenti ilk yüklendiğinde veya bir JSON URL'si belirtilmemişse kullanılacak bir varsayılan URL listesi içerir.
* **Kolay Ayarlar:** Kullanıcı dostu bir ayarlar sayfası üzerinden JSON URL'si yapılandırılabilir ve yerel URL listesi yönetilebilir.

## Kurulum

1.  Bu repository'yi bilgisayarınıza klonlayın veya ZIP olarak indirin.
2.  Chrome tarayıcınızda `chrome://extensions/` adresine gidin.
3.  Sağ üst köşedeki "Geliştirici modu" anahtarını etkinleştirin.
4.  Sol üst köşedeki "Paketlenmemiş yükle" düğmesine tıklayın.
5.  İndirdiğiniz veya klonladığınız repository klasörünü seçin ve "Aç"a tıklayın.

Eklenti Chrome'a yüklenecektir.

## Kullanım

1.  Eklenti simgesine tıklayarak veya `chrome://extensions/` sayfasından "Seçenekler" bağlantısına tıklayarak eklentinin ayarlar sayfasına gidin.
2.  **JSON URL'sini Ayarla** bölümüne, URL listesini içeren bir JSON dosyasının adresini girebilir ve "Kaydet" butonuna tıklayabilirsiniz. JSON dosyasının aşağıdaki formatta olması gerekmektedir:
    ```json
    {
      "blockedUrls": [
        "[https://www.example.com](https://www.example.com)",
        "[https://www.anotherexample.net](https://www.anotherexample.net)"
      ]
    }
    ```
3.  **Yeni URL Ekle** bölümüne, engellemek istediğiniz yeni bir URL (alan adı ve protokolü ile birlikte, örneğin `https://www.yasaklisite.com`) girebilir ve "Ekle" butonuna tıklayabilirsiniz. Bu URL yerel listenize eklenecektir.
4.  **Yasaklı URL'ler (Güncel Kaynak)** bölümünde, eklentinin şu anda kullandığı URL listesini görebilirsiniz. Yerel olarak eklediğiniz URL'lerin yanında "Sil" butonu bulunur.
5.  Artık, ayarladığınız listede bulunan bir siteye girdiğinizde, sayfanın en üstünde bir uyarı görseli belirecektir.

## Katkıda Bulunma

Bu projeye katkıda bulunmak isterseniz, lütfen aşağıdaki adımları izleyin:

1.  Bu repository'yi fork edin.
2.  Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`).
3.  Değişikliklerinizi yapın ve commit'leyin (`git commit -am 'Yeni özellik eklendi'`).
4.  Branch'inizi push edin (`git push origin feature/yeni-ozellik`).
5.  Bir pull request gönderin.


## İletişim

[Github](https://github.com/camcicarsi)