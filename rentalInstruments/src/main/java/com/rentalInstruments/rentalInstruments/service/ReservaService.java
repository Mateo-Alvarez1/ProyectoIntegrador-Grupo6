package com.rentalInstruments.rentalInstruments.service;

import com.amazonaws.services.connect.model.UserNotFoundException;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Instrumento;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Reserva;
import com.rentalInstruments.rentalInstruments.Repository.Entities.Usuario;
import com.rentalInstruments.rentalInstruments.Repository.InstrumentoRepository;
import com.rentalInstruments.rentalInstruments.Repository.ReservaRepository;
import com.rentalInstruments.rentalInstruments.Repository.UsuarioRepository;
import com.rentalInstruments.rentalInstruments.email.EmailSender;
import com.rentalInstruments.rentalInstruments.exceptions.NotAvailableDateException;
import com.rentalInstruments.rentalInstruments.exceptions.ResourceNotFoundException;
import com.rentalInstruments.rentalInstruments.model.ReservaDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j

public class ReservaService implements IReservaService{

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @Autowired
    private InstrumentoService instrumentoService;

    @Autowired
    private ReservaRepository reservasRepository;

    private ReservaService reservaService;

    @Autowired
    private EmailSender emailSender;

    @Override
    public List<Reserva> buscarPorInstrumento(Long id) throws ResourceNotFoundException {
        Optional<Instrumento> instrumentoOptional= instrumentoRepository.findById(id);
        if (instrumentoOptional.isEmpty()){
            log.error("No existe el instrumento");
            throw new ResourceNotFoundException("No existe el instrumento");
        }
        Instrumento instrumento= instrumentoOptional.get();
        List<Reserva> reservas= instrumento.getReservas();
        return reservas;
    }

    @Override
    public List<Reserva> buscarPorUsuario(String email) throws ResourceNotFoundException {
        Optional<Usuario> usuarioOptional= usuarioRepository.findByEmail(email);
        if (usuarioOptional.isEmpty()){
            log.error("No existe el usuario");
            throw new ResourceNotFoundException("No existe el usuario");
        }
        Usuario usuario= usuarioOptional.get();
        List<Reserva> reservas= usuario.getReservas();
        return reservas;
    }

    @Override
    public Reserva buscar(Long id) throws ResourceNotFoundException {
        Optional<Reserva> reservaOptional=reservasRepository.findById(id);
        if (reservaOptional.isEmpty()){
            log.error("No existe la reserva");
            throw new ResourceNotFoundException("No existe la reserva");
        }

        Reserva reserva= reservaOptional.get();
        return reserva;

    }

    @Override
    public List<Reserva> buscarTodos() throws ResourceNotFoundException {
        List<Reserva> reservaOptional=reservasRepository.findAll();
        if (reservaOptional.isEmpty()){
            log.error("No existen reservas");
            throw new ResourceNotFoundException("No existe la reserva");
        }

        return reservaOptional;


    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<Reserva> reservaOptional=reservasRepository.findById(id);
        if (reservaOptional.isEmpty()){
            log.error("No existe la reserva");
            throw new ResourceNotFoundException("No existe la reserva");
        }
        reservasRepository.deleteById(id);

    }

    @Override
    public Reserva agregarReserva(ReservaDto reservaDto) throws ResourceNotFoundException, UserNotFoundException, NotAvailableDateException {
        Optional<Usuario> usuarioOptional= usuarioRepository.findByEmail(reservaDto.getUsuario().getEmail());
        if (usuarioOptional.isEmpty()) {
            log.error("No existe el usuario de la reserva");
            throw new UserNotFoundException("No existe el usuario");
        }
        Usuario usuario= usuarioOptional.get();


        Optional<Instrumento> instrumentoOptional= instrumentoRepository.findById(reservaDto.getInstrumento().getId());

        if (instrumentoOptional.isEmpty()) {
            log.error("No existe el instrumento de la reserva");
            throw new ResourceNotFoundException("No existe el instrumento");

        }

        List<Reserva> reservaList = instrumentoOptional.get().getReservas();

        if (!reservaList.isEmpty()) {
            for (Reserva reserva : reservaList) {
                // Verificar si hay solapamiento de fechas
                if (reserva.getFechaInicio().isEqual(reservaDto.getFechaInicio())
                        || reserva.getFechaInicio().isEqual(reservaDto.getFechaDevolucion())
                        || reserva.getFechaDevolucion().isEqual(reservaDto.getFechaInicio())
                        || reserva.getFechaDevolucion().isEqual(reservaDto.getFechaDevolucion())
                        || (reserva.getFechaInicio().isBefore(reservaDto.getFechaDevolucion()) &&
                        reserva.getFechaDevolucion().isAfter(reservaDto.getFechaInicio()))) {
                    log.error("La fecha para la reserva no se encuentra disponible");
                    throw new NotAvailableDateException("La fecha para la reserva no se encuentra disponible");
                }
            }
        }






        Instrumento instrumento= instrumentoOptional.get();

        Reserva reserva= new Reserva();
        reserva.setUsuario(usuario);
        reserva.setInstrumento(instrumento);
        reserva.setFechaInicio(reservaDto.getFechaInicio());
        reserva.setFechaDevolucion(reservaDto.getFechaDevolucion());

        reservasRepository.save(reserva);

        log.info("Reserva agregada con exito");
        String link ="http://pitchpleasefront.s3-website-us-east-1.amazonaws.com/";
        emailSender.send(usuario.getEmail(),  buildEmail(usuario.getNombre() , link , usuario.getEmail()));


        return reserva;

    }



















    private String buildEmail(String name, String link , String email) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Gracias por realizar una reserva en PitchPlease</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hola " + name + ", " + email  + " </p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Gracias por realizar una reserva . Haga clic en el siguiente enlace para seguir disfrutando de nuestro sitio: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Redirigir ahora</a> </p></blockquote>\n Gracias por elegirnos . <p>Nos vemos pronto</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }
}
